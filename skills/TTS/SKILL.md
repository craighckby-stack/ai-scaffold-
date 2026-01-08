name: TTS
description: Implement text-to-speech (TTS) capabilities using the z-ai-web-dev-sdk. Use this skill when the user needs to convert text into natural-sounding speech, create audio content, build voice-enabled applications, or generate spoken audio files. Supports multiple voices, adjustable speed, and various audio formats.
license: MIT
---

# TTS (Text to Speech) Skill

This skill documents the implementation of text-to-speech (TTS) functionality using the `z-ai-web-dev-sdk`, enabling conversion of text into natural-sounding speech audio.

## Skill Path

**Skill Location**: `{project_path}/skills/TTS`

**Reference Scripts**: Example test scripts are available in the `{Skill Location}/scripts/` directory (e.g., `{Skill Location}/scripts/tts.ts`).

## Overview

Text-to-Speech allows you to generate spoken audio from text input, supporting various voices, speeds, and output formats.

**IMPORTANT**: `z-ai-web-dev-sdk` MUST be used in backend code only. Never use it in client-side code.

## API Constraints and Parameters

| Parameter | Constraint / Range | Default | Notes |
| :--- | :--- | :--- | :--- |
| **Input Text** | Maximum 1024 characters | N/A | Longer text must be split into chunks. |
| **Speed** | 0.5 (slowest) to 2.0 (fastest) | 1.0 | Outside this range causes errors. |
| **Volume** | (0, 10] | 1.0 | Optional. |
| **Format (Non-Streaming)**| `wav`, `mp3`, `pcm` | `wav` | Requires `stream: false`. |
| **Format (Streaming)** | Only `pcm` is supported | N/A | Requires `stream: true`. |
| **Sample Rate** | 24000 Hz | 24000 Hz | Recommended output rate. |

### Utility: Handling Long Text Input

Use this function to segment longer content by sentences to respect the 1024 character limit per API call.

```javascript
/**
 * Splits text into chunks based on sentence boundaries, respecting a maximum length.
 * @param {string} text - The input text.
 * @param {number} maxLength - Max length for each chunk (default 1020, slightly below API limit).
 * @returns {string[]} An array of text chunks.
 */
function splitTextIntoChunks(text, maxLength = 1020) {
  const chunks = [];
  // Splits text by common sentence terminators (., !, ?)
  // Ensures we keep the terminator with the sentence.
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text]; 
  
  let currentChunk = '';
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  
  return chunks;
}
```

## Prerequisites

The `z-ai-web-dev-sdk` package is assumed to be installed and ready for use in a Node.js backend environment.

## CLI Usage (Simple Tasks)

For quick audio generation or testing, use the z-ai CLI.

### Basic TTS Example

```bash
# Convert text to speech (default WAV format)
z-ai tts --input "Hello, world" --output ./hello.wav
```

### Advanced Options Summary

| Option | Shorthand | Description | Constraint |
| :--- | :--- | :--- | :--- |
| `--input` | `-i` | Text to convert (Required) | Max 1024 chars |
| `--output` | `-o` | Output audio file path (Required) | N/A |
| `--voice` | `-v` | Voice type | Default: `tongtong` |
| `--speed` | `-s` | Speech speed | Range: 0.5 to 2.0 |
| `--format` | `-f` | Output format | `wav`, `mp3`, `pcm` (Default: `wav`) |
| `--stream` | | Enable streaming output | Requires `pcm` format |

## SDK Implementation

All SDK examples require Node.js environment utilities (`fs`, `path`) and the `z-ai-web-dev-sdk`.

### Helper: Convert Response to Buffer

This utility is essential for handling the Web Response object returned by the SDK in a Node.js environment.

```javascript
import { Buffer } from 'buffer'; // Required for Node environments

/**
 * Converts a standard Web Response object (containing audio data) to a Node Buffer.
 * @param {Response} response - The response object from zai.audio.tts.create.
 * @returns {Promise<Buffer>} The audio data as a Node Buffer.
 */
async function responseToBuffer(response) {
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(new Uint8Array(arrayBuffer));
}
```

### 1. Basic TTS Generation

This function converts text to audio using default settings and saves it to a file.

```javascript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
// Assuming responseToBuffer utility is available

/**
 * Generates audio from text and saves it locally.
 * @param {string} text - The text to synthesize.
 * @param {string} outputPath - Path to save the resulting audio file.
 * @returns {Promise<string>} The path of the saved file.
 */
async function textToSpeech(text, outputPath) {
  const zai = await ZAI.create();

  const response = await zai.audio.tts.create({
    input: text,
    voice: 'tongtong',
    speed: 1.0,
    response_format: 'wav',
    stream: false
  });

  const buffer = await responseToBuffer(response); 
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Audio saved to ${outputPath}`);
  return outputPath;
}

// Usage: await textToSpeech('Hello, world!', './output.wav');
```

### 2. Adjustable Parameters

A generalized function supporting voice, speed, volume, and format configuration.

```javascript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function generateWithOptions(text, options, outputPath) {
  const zai = await ZAI.create();
  
  const defaults = {
    voice: 'tongtong',
    speed: 1.0, 
    volume: 1.0, 
    format: 'wav',
    stream: false
  };
  const params = { ...defaults, ...options };

  const response = await zai.audio.tts.create({
    input: text,
    voice: params.voice, 
    speed: params.speed,
    volume: params.volume,
    response_format: params.format,
    stream: params.stream
  });

  const buffer = await responseToBuffer(response);
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}

// Usage: await generateWithOptions('MP3 output test.', { format: 'mp3', speed: 1.5 }, './mp3_test.mp3');
```

### 3. Batch Processing and Chunks

This combines the long text handling utility (`splitTextIntoChunks`) with batch generation.

```javascript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

/**
 * Generates audio for long text by splitting it and processing chunks sequentially.
 * @param {string} longText - The full text to synthesize.
 * @param {string} outputDir - Directory to save sequential chunks.
 */
async function generateLongText(longText, outputDir) {
  const zai = await ZAI.create();
  const chunks = splitTextIntoChunks(longText); // Use utility defined earlier
  const results = [];

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < chunks.length; i++) {
    const text = chunks[i];
    const outputPath = path.join(outputDir, `part_${i + 1}.wav`);

    try {
      const response = await zai.audio.tts.create({
        input: text,
        voice: 'tongtong',
        response_format: 'wav',
        stream: false
      });

      const buffer = await responseToBuffer(response);
      fs.writeFileSync(outputPath, buffer);
      results.push(outputPath);

    } catch (error) {
      console.error(`Chunk ${i + 1} failed:`, error.message);
    }
  }
  return results;
}

/*
// Usage
const longText = "This is a very long text input that exceeds the 1024 character limit. It must be split by sentence boundaries for accurate and compliant processing by the TTS API.";
const files = await generateLongText(longText, './long-audio-output');
*/
```

## Integration Example: Next.js API Route

Example of serving the generated audio buffer directly through a serverless function.

```javascript
import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Define a singleton pattern outside the handler for optimal performance
let zaiInstance = null;
async function getZAIInstance() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'tongtong', speed = 1.0, format = 'wav' } = await req.json();

    if (!text || text.length > 1024) {
      return NextResponse.json(
        { error: 'Invalid text input (0 < length <= 1024)' },
        { status: 400 }
      );
    }
    
    const zai = await getZAIInstance();

    const response = await zai.audio.tts.create({
      input: text.trim(),
      voice,
      speed,
      response_format: format,
      stream: false, // Generally prefer non-streaming for standard HTTP responses
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': `audio/${format === 'pcm' ? 'pcm' : format}`, // Adjust content type dynamically
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache', 
      },
    });

  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json(
      { error: 'Audio generation failed.' },
      { status: 500 }
    );
  }
}
```

## Best Practices and Robust Implementation

### 1. SDK Instance Reuse (Singleton)

Reuse the SDK instance across requests to avoid performance overhead associated with initialization.

```javascript
import ZAI from 'z-ai-web-dev-sdk';

let zaiInstance = null;

/** Returns or creates the singleton ZAI SDK instance. */
async function getZAIInstance() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}
```

### 2. Comprehensive Synthesis Function

Combine input validation, text cleaning, instance reuse, and robust error handling into a single utility.

```javascript
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
// Requires getZAIInstance() and responseToBuffer() utilities

/**
 * Cleans text for better TTS pronunciation (e.g., handles common abbreviations).
 */
function prepareTextForTTS(text) {
  text = text.replace(/\s+/g, ' ').trim();
  const abbreviations = { 'Dr.': 'Doctor', 'Mr.': 'Mister', 'Mrs.': 'Misses' };
  for (const [abbr, full] of Object.entries(abbreviations)) {
    text = text.replace(new RegExp(abbr, 'g'), full);
  }
  return text;
}

async function safeTTS(text, outputPath, options = {}) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error('Text input cannot be empty');
    }
    if (text.length > 1024) {
      throw new Error('Text input exceeds maximum length (1024 characters). Use chunking utility.');
    }
    
    const processedText = prepareTextForTTS(text);
    const zai = await getZAIInstance(); 
    
    const params = {
      input: processedText,
      voice: options.voice || 'tongtong',
      speed: options.speed || 1.0,
      response_format: options.format || 'wav',
      stream: options.stream || false
    };

    const response = await zai.audio.tts.create(params);

    const buffer = await responseToBuffer(response);
    fs.writeFileSync(outputPath, buffer);

    return { success: true, path: outputPath, size: buffer.length };

  } catch (error) {
    console.error(`TTS Error for '${text.substring(0, 50)}...':`, error.message);
    return { success: false, error: error.message };
  }
}
```

## Reference Information

### Handling the Response Object

The `zai.audio.tts.create()` method returns a standard Web `Response` object. The audio data must be extracted via `response.arrayBuffer()` and then converted to a Node Buffer, as shown in the `responseToBuffer` utility.

### Available Voices

| Voice Name | Usage |
| :--- | :--- |
| `tongtong` | Default voice |
| `chuichui` | |
| `xiaochen` | |
| `jam` | |
| `kazi` | |
| `douji` | |
| `luodo` | |

### Troubleshooting Checklist

| Issue | Solution |
| :--- | :--- |
| Text exceeds 1024 chars | Use `splitTextIntoChunks` to segment the content. |
| Invalid Speed/Volume | Ensure speed is [0.5, 2.0] and volume is (0, 10]. |
| Streaming Fails with WAV/MP3 | Streaming only supports `pcm` format. Set `stream: false` for other formats. |
| Audio is corrupted/empty | Verify buffer conversion: `Buffer.from(await response.arrayBuffer())`. |
| Slow performance | Implement SDK instance reuse (singleton pattern). |
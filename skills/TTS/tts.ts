import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const DEFAULT_VOICE = "tongtong";
const DEFAULT_OUTFILE = "output.wav";

/**
 * Converts text to speech (TTS) and saves the output to a file.
 * @param text The text to synthesize.
 * @param outFile The path to save the resulting audio file.
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.error('ERROR: Text input required.');
        console.log(`Usage: node tts.js "Hello, world!" [output.wav]`);
        return;
    }

    const text = args[0];
    const rawOutFile = args[1] || DEFAULT_OUTFILE;
    const absoluteOutFile = path.resolve(rawOutFile);


  try {
    console.log(`Initializing ZAI SDK for TTS generation.`);
    const zai = await ZAI.create();

    const response = await zai.audio.tts.create({
      input: text,
      voice: DEFAULT_VOICE,
      speed: 1.0,
      response_format: "wav",
      stream: false,
    });

    // Ensure response is valid before processing
    if (!response || !response.arrayBuffer) {
        throw new Error("Invalid or empty response received from TTS API.");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));
    
    fs.writeFileSync(absoluteOutFile, buffer);
    console.log(`\n✅ TTS audio successfully saved to ${absoluteOutFile}`);
  } catch (err: any) {
    console.error("\nFATAL TTS FAILURE:", err?.message || err);
  }
}

// Execute the main function
main();
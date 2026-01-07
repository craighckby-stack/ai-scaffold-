import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const DEFAULT_VOICE = "tongtong";
const DEFAULT_OUTFILE = "output.wav";
const MAX_TEXT_PREVIEW = 50;

/**
 * Converts text to speech (TTS) and saves the output to a file.
 */
async function main() {
    const [rawText, rawOutFile] = process.argv.slice(2);
    
    const text = rawText ? rawText.trim() : '';
    const absoluteOutFile = path.resolve(rawOutFile || DEFAULT_OUTFILE);

    if (!text) {
        console.error('ERROR: Text input required.');
        console.log(`Usage: node tts.js "Your text here" [optional/output/path.wav]`);
        process.exit(1);
    }

    const previewText = text.length > MAX_TEXT_PREVIEW
        ? `${text.substring(0, MAX_TEXT_PREVIEW)}...`
        : text;

    try {
        console.log(`Initializing ZAI SDK...`);
        const zai = await ZAI.create();

        console.log(`Synthesizing text: "${previewText}"`);
        
        const response = await zai.audio.tts.create({
            input: text,
            voice: DEFAULT_VOICE,
            speed: 1.0,
            response_format: "wav",
            stream: false,
        });

        if (!response || typeof response.arrayBuffer !== 'function') {
            throw new Error("Invalid or unexpected response structure received from TTS API.");
        }

        const arrayBuffer = await response.arrayBuffer();
        
        // Optimized Buffer creation for Node.js environments
        const buffer = Buffer.from(arrayBuffer); 
        
        fs.writeFileSync(absoluteOutFile, buffer);
        
        console.log(`\n✅ TTS audio successfully saved to ${absoluteOutFile}`);
    } catch (err) {
        console.error("\nFATAL TTS FAILURE:");
        if (err instanceof Error) {
            console.error(`Message: ${err.message}`);
        } else {
            console.error(`An unknown error occurred: ${String(err)}`);
        }
        process.exit(1);
    }
}

main();
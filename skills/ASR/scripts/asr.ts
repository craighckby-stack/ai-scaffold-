import ZAI from 'z-ai-web-dev-sdk';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Performs Automatic Speech Recognition (ASR) on a local audio file.
 */
async function main() {
    // Determine input path, handling arguments concisely.
    const inputPathSegment = process.argv[2];
    
    if (!inputPathSegment) {
        console.error('ERROR: Input audio file path required.');
        console.log('Usage: node asr.js <path/to/audio.wav>');
        process.exit(1);
    }

    const absoluteInputPath = path.resolve(inputPathSegment);

    try {
        // Validate file existence early using sync check
        if (!fs.existsSync(absoluteInputPath)) {
            throw new Error(`Audio file not found: ${absoluteInputPath}`);
        }

        console.log(`Reading and submitting file: ${absoluteInputPath}`);

        // Load file and encode immediately
		const file_base64 = fs.readFileSync(absoluteInputPath, { encoding: 'base64' });
		
        // Initialize ZAI SDK (Heavy operation, done before the API call)
        const zai = await ZAI.create();

        // Perform ASR
		const result = await zai.audio.asr.create({ 
            file_base64,
            model: 'glm-4-flash' // Optimized for speed/cost
        });

		const transcription = result.text?.trim();

		console.log('\n--- ASR Transcription Result ---');
        if (transcription) {
            console.log(transcription);
        } else {
             console.log('No transcription text received.');
             // Minimal logging for status issues
             if (result.status && result.status !== 200) {
                 console.log(`API Status Error: ${result.status}`);
             }
        }

	} catch (err) {
		console.error('\nFATAL ASR FAILURE:');
        if (err instanceof Error) {
             console.error(`Error: ${err.message}`);
        } else {
            console.error(`Unknown Error: ${String(err)}`);
        }
        process.exit(1);
	}
}

main();
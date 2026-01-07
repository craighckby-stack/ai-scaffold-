import ZAI from 'z-ai-web-dev-sdk';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Performs Automatic Speech Recognition (ASR) on a local audio file.
 */
async function main() {
    // Robust argument parsing: resolves the full path from all subsequent arguments.
    const inputPathSegment = process.argv.slice(2).join(' ').trim();
    
    if (!inputPathSegment) {
        console.error('ERROR: Input audio file path required.');
        console.log('Usage: node asr.js <path/to/audio.wav>');
        process.exit(1);
    }

    const absoluteInputPath = path.resolve(inputPathSegment);

	if (!fs.existsSync(absoluteInputPath)) {
		console.error(`ERROR: Audio file not found: ${absoluteInputPath}`);
        process.exit(1);
	}

    console.log(`Reading and submitting file: ${absoluteInputPath}`);

	try {
        // Load file data
		const audioBuffer = fs.readFileSync(absoluteInputPath);
		const file_base64 = audioBuffer.toString('base64');
		
        // Initialize ZAI SDK (can be slower, do this before the API call)
        const zai = await ZAI.create();

        // Perform ASR using an optimized model
		const result = await zai.audio.asr.create({ 
            file_base64,
            model: 'glm-4-flash'
        });

		const transcription = result.text?.trim();

		console.log('\n--- ASR Transcription Result ---');
        if (transcription) {
            console.log(transcription);
        } else {
             console.log('No transcription text received.');
             // Log minimal response info if debugging is needed
             if (result.status && result.status !== 200) {
                 console.log(JSON.stringify({ status: result.status, message: result.message }, null, 2));
             }
        }

	} catch (err) {
		console.error('\nFATAL ASR FAILURE:');
        if (err instanceof Error) {
             console.error(`Error Message: ${err.message}`);
        } else {
            console.error(String(err));
        }
        process.exit(1);
	}
}

main();
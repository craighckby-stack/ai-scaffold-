import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

/**
 * Performs Automatic Speech Recognition (ASR) on a local audio file.
 * @param inputFile The path to the input audio file (e.g., .wav, .mp3).
 */
async function main() {
    const inputFile = process.argv[2];

    if (!inputFile) {
        console.error('ERROR: Input audio file path required.');
        console.log('Usage: node asr.js <path/to/audio.wav>');
        return;
    }

    const absoluteInputPath = path.resolve(inputFile);

	if (!fs.existsSync(absoluteInputPath)) {
		console.error(`ERROR: Audio file not found: ${absoluteInputPath}`);
        return;
	}

	try {
        console.log(`Initializing ZAI SDK and reading file: ${absoluteInputPath}`);
		const zai = await ZAI.create();

		const audioBuffer = fs.readFileSync(absoluteInputPath);
		// Convert audio buffer to base64 string for API submission
		const file_base64 = audioBuffer.toString('base64');

		const result = await zai.audio.asr.create({ 
            file_base64,
            // Ensure necessary parameters are set, though default model usually handles ASR
            model: 'glm-4-flash'
        });

		console.log('\n--- ASR Transcription Result ---');
		console.log(result.text ?? 'No transcription text received.');
        
        if (result.text === undefined) {
            console.log('Full API response:');
            console.log(JSON.stringify(result, null, 2));
        }

	} catch (err: any) {
		console.error('\nFATAL ASR FAILURE:', err?.message || err);
	}
}

// Execute the main function
main();
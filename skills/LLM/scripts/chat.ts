import ZAI from "z-ai-web-dev-sdk";

async function main() {
    const prompt = process.argv.slice(2).join(' ').trim();
    if (!prompt) {
        console.error('ERROR: Prompt required. Usage: node chat.js "Query"');
        return;
    }

    try {
        console.log(`> ${prompt}`);
        
        const response = await (await ZAI.create()).chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "glm-4-flash", 
            stream: false,
            thinking: { type: "disabled" },
        });

        const reply = response.choices?.[0]?.message?.content?.trim();
        
        console.log("\n--- REPLY ---");
        
        if (reply) {
            console.log(reply);
        } else {
            console.error('ERROR: Empty response.');
            console.error(JSON.stringify(response, null, 2));
        }
    } catch (err) {
        console.error("\nFATAL ERROR:", (err as Error).message || err);
    }
}

main();
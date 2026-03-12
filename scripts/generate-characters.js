require("dotenv").config({ path: require('path').resolve(__dirname, '../.env.local') });
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Falta la variable de entorno OPENAI_API_KEY.");
    console.error("Asegúrate de que .env.local existe en la raíz del proyecto.");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const STYLE_PRESET =
    "Enchanting Nordic fairy tale illustration, ethereal and dreamlike, soft painterly textures, inspired by Kay Nielsen and Arthur Rackham, subtle gradients, magical luminescence, children's book illustration style, whimsical yet sophisticated, rich details, atmospheric depth, 8K quality, no text, no frames, single subject only";

const assetPrompts = [
    {
        filename: "character-gerda.png",
        prompt: `${STYLE_PRESET}. A SINGLE, full-body portrait of a brave young girl named Gerda with long blonde braids and a red cloak. She is standing alone in the center of the frame. Pure storybook style. NO character sheet, NO multiple poses, NO turnaround. Isolated on a solid, pure #FFFFFF white background. High contrast between subject and background.`,
    },
    {
        filename: "character-kay.png",
        prompt: `${STYLE_PRESET}. A SINGLE, full-body portrait of a young boy named Kay with messy brown hair and simple peasant clothes. He is standing alone in the center of the frame, looking happy. Pure storybook style. NO character sheet, NO multiple versions, NO turnaround. Isolated on a solid, pure #FFFFFF white background. High contrast between subject and background.`,
    },
    {
        filename: "character-snow-queen.png",
        prompt: `${STYLE_PRESET}. A SINGLE, full-body portrait of the majestic Snow Queen with silver-white hair and a frost crown. She is standing alone in the center of the frame. Regal and cold. NO character sheet, NO multiple poses, NO turnaround. Isolated on a solid, pure #FFFFFF white background. High contrast between subject and background.`,
    },
    {
        filename: "elements-roses.png",
        prompt: `${STYLE_PRESET}. A single, beautiful red rose with green leaves, centered. Soft painterly style. NO grid, NO multiple items, NO white boxes. Isolated on a solid, pure #FFFFFF white background.`,
    },
];

async function generateImage(prompt, filename) {
    console.log(`🎨 Generando: ${filename}...`);
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            quality: "hd",
            style: "natural",
        });

        const imageUrl = response.data[0].url;
        console.log(`🔗 URL: ${imageUrl}`);
        const res = await fetch(imageUrl);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const outputDir = path.join(__dirname, "..", "public", "images", "story");
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        const outputPath = path.join(outputDir, filename);
        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Guardada: ${filename}`);
        // Delay for rate limit
        await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
        console.error(`❌ Error generando ${filename}:`, error.message || error);
    }
}

async function run() {
    console.log("🚀 Iniciando regeneración de assets visuales...");
    for (const asset of assetPrompts) {
        await generateImage(asset.prompt, asset.filename);
    }
}

run();

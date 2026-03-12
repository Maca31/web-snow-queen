require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const PREMIUM_STYLE = `
Cinematic digital painting, highly detailed, professional illustration quality, 
consistent art style throughout, soft atmospheric lighting, rich color palette, 
depth of field, painterly textures, inspired by Disney and Pixar concept art,
no duplicate characters, no overlaid elements, seamless composition, 
8K resolution, trending on ArtStation, masterpiece quality
`;

const CHARACTERS = {
    gerda: `Young girl age 10, long blonde hair in two neat braids with red ribbons, bright blue eyes full of determination and warmth, rosy cheeks, wearing a simple medieval dress with a distinctive RED HOODED CLOAK, kind and brave expression, delicate features`,
    kay: `Young boy age 10, messy brown hair, warm brown eyes (when normal), ice-blue cold eyes (when frozen), simple medieval peasant outfit with suspenders and brown boots, friendly face`,
    snowQueen: `Ethereally beautiful tall woman, impossibly long flowing white-silver hair, piercing ice-blue eyes with no warmth, pale luminescent skin, elaborate gown made entirely of ice crystals and frost, intricate ice crown with sharp edges, regal and cold presence, translucent cape that flows like frozen mist`,
    witch: `Kind elderly woman with gentle wrinkled face, long gray hair, wearing a large straw sun hat with flowers, flowing earth-tone dress, warm grandmother-like smile, surrounded by magical flowers`,
    robberGirl: `Wild fierce girl age 12, messy dark brown hair, intense green eyes, wearing leather vest and pants, fur-lined boots, carries a small dagger, mischievous but not evil expression, confident stance`,
    princess: `Elegant young woman age 18, elaborate updo hairstyle with jewels, wearing royal gown with gold embroidery, kind expression, sitting on ornate throne`
};

const missingPrompts = [
    {
        filename: "scene-11-rescue-embrace.png",
        prompt: `${PREMIUM_STYLE}. Cinematic climax: Two children, Gerda and Kay, reunited in a magnificent crystal ice palace. Warm golden light is glowing from their center, melting the surrounding blue ice into sparkling water. Gerda has a joyful expression, Kay looks relieved and warm. Beautiful red roses are blooming through the melting frost in the foreground. Magical atmosphere, masterpiece quality digital painting, soft lighting, emotional and hopeful.`
    },
    {
        filename: "scene-12-spring-return.png",
        prompt: `${PREMIUM_STYLE}. Cinematic finale: Two teenagers, Gerda and Kay, standing hand-in-hand in a vibrant rooftop garden filled with blooming red roses. Warm golden spring sunlight, blue sky with soft white clouds, butterflies in the air. Peaceful and happy ending, Nordic village in the soft background. Masterpiece quality illustration, rich colors, joyful atmosphere.`
    }
];

async function generateImage(prompt, filename) {
    console.log(`\n🎨 Generating: ${filename}...`);
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1792x1024",
            quality: "hd",
            style: "natural"
        });
        const imageUrl = response.data[0].url;
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();
        const outputPath = path.join(__dirname, '..', 'public', 'images', 'story', filename);
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`✅ Successfully saved: ${filename}`);
        await new Promise(resolve => setTimeout(resolve, 12000));
    } catch (error) {
        console.error(`\n❌ Error generating ${filename}: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

async function run() {
    for (const item of missingPrompts) {
        await generateImage(item.prompt, item.filename);
    }
}

run().catch(console.error);

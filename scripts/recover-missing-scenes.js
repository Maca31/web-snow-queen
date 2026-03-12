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
        filename: "scene-06-gerda-river.png",
        prompt: `${PREMIUM_STYLE}. Melancholic scene: ${CHARACTERS.gerda} sitting alone in a small wooden rowboat floating on a calm winding river, she is releasing her RED SHOES into the water as an offering (shoes visible floating), morning mist over the water surface, willow trees with hanging branches on the riverbank, lily pads and water plants, gentle ripples in the water, Gerda looking determined but sad, soft diffused light, peaceful but lonely atmosphere, birds flying in the distance, reflection of the boat in the water, cinematic composition, no duplicate characters`
    },
    {
        filename: "scene-07-witch-garden.png",
        prompt: `${PREMIUM_STYLE}. Magical surreal scene: Enchanted garden with enormous vibrant flowers much taller than a child, each flower (roses, tulips, lilies) has subtle facial features giving them personality, ${CHARACTERS.witch} tending to the flowers with a watering can, ${CHARACTERS.gerda} walking through the garden looking amazed, whimsical cottage with curved roof and round windows in background, warm sunset colors (oranges, pinks, purples), dreamy haze, magical glowing particles floating, flowers seem alive and aware, fantastical atmosphere, no overlapping duplicate characters, clear depth and composition, painterly quality`
    },
    {
        filename: "scene-08-golden-palace.png",
        prompt: `${PREMIUM_STYLE}. Opulent baroque interior: Grand palace throne room with soaring ornate ceilings with frescoes, massive crystal chandelier with lit candles, golden decorations everywhere, marble columns with Corinthian capitals, ${CHARACTERS.princess} sitting on an elaborate golden throne, ${CHARACTERS.gerda} in her simple red cloak standing before the throne looking small in contrast, royal guards in ceremonial dress standing at attention, rich red carpet leading to throne, warm candlelight creating dramatic lighting, sense of luxury and grandeur, detailed architecture, no duplicate characters, clear spatial depth, cinematic perspective`
    },
    {
        filename: "scene-09-robber-girl.png",
        prompt: `${PREMIUM_STYLE}. Dark forest scene at night: ${CHARACTERS.robberGirl} sitting by a campfire with a magnificent reindeer with large detailed antlers beside her, ${CHARACTERS.gerda} sitting across the fire, rustic hideout made of wood and animal furs in background, torches providing flickering warm light, dark Nordic pine forest surrounding them, moonlight filtering through trees, sense of wilderness and danger, atmospheric smoke from fire, contrast between firelight warmth and cold dark forest, detailed character expressions, no duplicate characters, natural poses, cinematic night lighting`
    },
    {
        filename: "scene-10-ice-palace.png",
        prompt: `${PREMIUM_STYLE}. Breathtaking frozen scene: Colossal palace made entirely of transparent crystalline ice and snow, geometric angular ice architecture with sharp spires reaching into the sky, everything glowing from within with ethereal blue light, northern lights visible in the night sky, frozen lake surrounding the palace reflecting the lights, ice sculptures of various shapes, ${CHARACTERS.kay} sitting alone in the vast throne room arranging geometric ice puzzle pieces on the floor, he looks tiny against the enormous scale of the ice hall, pristine and terrifying beauty, ultra-wide cinematic shot, cold color palette (blues and whites), no duplicate characters, sense of isolation and cold`
    },
    {
        filename: "scene-11-rescue-embrace.png",
        prompt: `${PREMIUM_STYLE}. Emotional climax scene: ${CHARACTERS.gerda} embracing ${CHARACTERS.kay} in the ice palace, warm tears falling from her face (visible as droplets), ice around them beginning to melt creating puddles of light, the ice shard emerging from Kay's eye as a tiny sparkle of light, Kay's expression softening as he recognizes Gerda, his eyes returning from ice-blue to warm brown, warm golden light breaking through cracks in the ice walls, impossible red roses blooming through the melting ice in foreground, contrast between cold blue ice and warm golden light, emotional intensity, no duplicate characters, clear facial expressions, hope and love theme, cinematic lighting, moment of transformation`
    },
    {
        filename: "scene-12-spring-return.png",
        prompt: `${PREMIUM_STYLE}. Joyful finale: ${CHARACTERS.gerda} and ${CHARACTERS.kay} (now teenagers, slightly older) back in the rose garden in full spring bloom, cherry blossom petals falling like snow, they are holding hands and smiling, surrounded by friends and family celebrating (background figures slightly blurred), warm golden sunlight streaming through, rainbow visible in the bright blue sky, butterflies everywhere, table with celebration feast, roses in full bloom, happiness radiating from the scene, warm color palette, sense of new beginning and hope, no duplicate main characters, clear composition with Gerda and Kay as focus, cinematic happy ending feel, depth of field with sharp focus on the main characters`
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

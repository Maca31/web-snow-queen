require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ═══════════════════════════════════════════════════════════════
// ESTILO BASE MEJORADO - CINEMATOGRÁFICO Y COHESIVO
// ═══════════════════════════════════════════════════════════════

const PREMIUM_STYLE = `
Cinematic digital painting, highly detailed, professional illustration quality, 
consistent art style throughout, soft atmospheric lighting, rich color palette, 
depth of field, painterly textures, inspired by Disney and Pixar concept art,
no duplicate characters, no overlaid elements, seamless composition, 
8K resolution, trending on ArtStation, masterpiece quality
`;

// ═══════════════════════════════════════════════════════════════
// DEFINICIÓN DE PERSONAJES CONSISTENTE
// ═══════════════════════════════════════════════════════════════

const CHARACTERS = {
    gerda: `
    Young girl age 10, long blonde hair in two neat braids with red ribbons,
    bright blue eyes full of determination and warmth, rosy cheeks,
    wearing a simple medieval dress with a distinctive RED HOODED CLOAK,
    kind and brave expression, delicate features
  `,

    kay: `
    Young boy age 10, messy brown hair, warm brown eyes (when normal),
    ice-blue cold eyes (when frozen), simple medieval peasant outfit 
    with suspenders and brown boots, friendly face
  `,

    snowQueen: `
    Ethereally beautiful tall woman, impossibly long flowing white-silver hair,
    piercing ice-blue eyes with no warmth, pale luminescent skin,
    elaborate gown made entirely of ice crystals and frost,
    intricate ice crown with sharp edges, regal and cold presence,
    translucent cape that flows like frozen mist
  `,

    witch: `
    Kind elderly woman with gentle wrinkled face, long gray hair,
    wearing a large straw sun hat with flowers, flowing earth-tone dress,
    warm grandmother-like smile, surrounded by magical flowers
  `,

    robberGirl: `
    Wild fierce girl age 12, messy dark brown hair, intense green eyes,
    wearing leather vest and pants, fur-lined boots, carries a small dagger,
    mischievous but not evil expression, confident stance
  `,

    princess: `
    Elegant young woman age 18, elaborate updo hairstyle with jewels,
    wearing royal gown with gold embroidery, kind expression,
    sitting on ornate throne
  `
};

// ═══════════════════════════════════════════════════════════════
// PROMPTS DE ESCENAS MEJORADOS
// ═══════════════════════════════════════════════════════════════

const scenesPrompts = [

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 1: PORTADA INTRO
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-01-intro.png",
        prompt: `${PREMIUM_STYLE}. 
    Epic title scene: Vast Nordic winter landscape at twilight, deep blue sky 
    transitioning to purple with aurora borealis dancing overhead, snow-covered 
    pine forest in the distance creating depth, pristine white snow field in 
    foreground with sparkles, single ornate ice-crystal frame in center ready 
    for title text, magical snowflakes floating gently, ethereal glow, 
    cinematic composition, ultra wide angle, no characters, no text, 
    atmospheric perspective, volumetric lighting`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 2: EL ESPEJO DEL DIABLO
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-02-devil-mirror.png",
        prompt: `${PREMIUM_STYLE}. 
    Dramatic dark scene: Large ornate gothic mirror with intricate carved frame,
    the mirror surface shows swirling dark purple and black magic inside creating
    distorted reflections, sinister atmosphere, dramatic lighting from below,
    the mirror is cracking with golden light seeping through the fractures,
    dark background with subtle magical mist, ominous mood, no characters visible,
    focus on the mirror as the central element, high contrast lighting,
    detailed texture on the frame, sense of impending danger`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 3: JARDÍN DE LA FELICIDAD
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-03-garden-happiness.png",
        prompt: `${PREMIUM_STYLE}. 
    Joyful summer scene: Beautiful rooftop garden in full bloom with vibrant
    pink and red roses everywhere, wooden benches and trellises covered in
    climbing roses, warm golden afternoon sunlight streaming through,
    colorful butterflies flying around, cobblestone European houses in 
    soft-focus background, wooden planters overflowing with flowers,
    rose petals scattered on the ground, peaceful and idyllic atmosphere,
    warm color palette dominated by pinks, reds, and golden yellows,
    depth of field with foreground roses in sharp focus,
    NO CHARACTERS in this shot - just the beautiful garden setting`
    },

    {
        filename: "character-gerda-kay-playing.png",
        prompt: `${PREMIUM_STYLE}. 
    Character illustration: ${CHARACTERS.gerda} and ${CHARACTERS.kay} 
    playing together happily in a rose garden, both children are laughing,
    Gerda is pointing at a butterfly, Kay is holding a small wooden toy,
    both characters clearly visible and well-defined, natural child-like poses,
    warm sunlight on their faces, surrounded by roses but not obscured by them,
    clean composition with characters as the focus, joyful expressions,
    no duplicate characters, no overlapping figures`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 4: EL FRAGMENTO EN EL OJO
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-04-shard-moment.png",
        prompt: `${PREMIUM_STYLE}. 
    Dramatic close-up: ${CHARACTERS.kay} face showing moment of pain and shock,
    single tiny glimmering ice crystal shard visible near his eye catching light,
    his expression transitioning from happiness to coldness, one eye starting
    to turn from brown to ice-blue, background slightly out of focus with
    roses beginning to wilt and lose color, transition from warm to cold tones,
    cinematic lighting emphasizing the drama, shallow depth of field focused
    on Kay's face, no duplicate characters, emotional intensity,
    color grading shifting from warm golds to cool blues`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 5: LA REINA DE LAS NIEVES
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-05-snow-queen-sleigh.png",
        prompt: `${PREMIUM_STYLE}. 
    Epic cinematic scene: ${CHARACTERS.snowQueen} sitting majestically on an
    elaborate sleigh made entirely of crystalline ice with intricate patterns,
    the sleigh is pulled by two magnificent translucent white horses made of
    snow and ice, swirling snowstorm all around creating motion blur,
    northern lights (aurora borealis) dancing in the night sky with ribbons
    of green and purple light, ${CHARACTERS.kay} sitting rigidly beside the
    Snow Queen looking hypnotized with ice-blue eyes, trail of ice crystals
    behind the sleigh, dynamic composition showing movement, cold color palette,
    moonlight reflecting off ice surfaces, dramatic and majestic,
    no character duplication, clear and detailed figures`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 6: GERDA EN EL RÍO
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-06-gerda-river.png",
        prompt: `${PREMIUM_STYLE}. 
    Melancholic scene: ${CHARACTERS.gerda} sitting alone in a small wooden
    rowboat floating on a calm winding river, she is releasing her RED SHOES
    into the water as an offering (shoes visible floating), morning mist over
    the water surface, willow trees with hanging branches on the riverbank,
    lily pads and water plants, gentle ripples in the water, Gerda looking
    determined but sad, soft diffused light, peaceful but lonely atmosphere,
    birds flying in the distance, reflection of the boat in the water,
    cinematic composition, no duplicate characters`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 7: JARDÍN ENCANTADO DE LA BRUJA
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-07-witch-garden.png",
        prompt: `${PREMIUM_STYLE}. 
    Magical surreal scene: Enchanted garden with enormous vibrant flowers
    much taller than a child, each flower (roses, tulips, lilies) has subtle
    facial features giving them personality, ${CHARACTERS.witch} tending to
    the flowers with a watering can, ${CHARACTERS.gerda} walking through the
    garden looking amazed, whimsical cottage with curved roof and round windows
    in background, warm sunset colors (oranges, pinks, purples), dreamy haze,
    magical glowing particles floating, flowers seem alive and aware,
    fantastical atmosphere, no overlapping duplicate characters,
    clear depth and composition, painterly quality`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 8: PALACIO DORADO
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-08-golden-palace.png",
        prompt: `${PREMIUM_STYLE}. 
    Opulent baroque interior: Grand palace throne room with soaring ornate
    ceilings with frescoes, massive crystal chandelier with lit candles,
    golden decorations everywhere, marble columns with Corinthian capitals,
    ${CHARACTERS.princess} sitting on an elaborate golden throne,
    ${CHARACTERS.gerda} in her simple red cloak standing before the throne
    looking small in contrast, royal guards in ceremonial dress standing at
    attention, rich red carpet leading to throne, warm candlelight creating
    dramatic lighting, sense of luxury and grandeur, detailed architecture,
    no duplicate characters, clear spatial depth, cinematic perspective`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 9: LA NIÑA BANDIDA
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-09-robber-girl.png",
        prompt: `${PREMIUM_STYLE}. 
    Dark forest scene at night: ${CHARACTERS.robberGirl} sitting by a campfire
    with a magnificent reindeer with large detailed antlers beside her,
    ${CHARACTERS.gerda} sitting across the fire, rustic hideout made of wood
    and animal furs in background, torches providing flickering warm light,
    dark Nordic pine forest surrounding them, moonlight filtering through trees,
    sense of wilderness and danger, atmospheric smoke from fire, contrast between
    firelight warmth and cold dark forest, detailed character expressions,
    no duplicate characters, natural poses, cinematic night lighting`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 10: PALACIO DE HIELO
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-10-ice-palace.png",
        prompt: `${PREMIUM_STYLE}. 
    Breathtaking frozen scene: Colossal palace made entirely of transparent
    crystalline ice and snow, geometric angular ice architecture with sharp
    spires reaching into the sky, everything glowing from within with ethereal
    blue light, northern lights visible in the night sky, frozen lake 
    surrounding the palace reflecting the lights, ice sculptures of various
    shapes, ${CHARACTERS.kay} sitting alone in the vast throne room arranging
    geometric ice puzzle pieces on the floor, he looks tiny against the
    enormous scale of the ice hall, pristine and terrifying beauty,
    ultra-wide cinematic shot, cold color palette (blues and whites),
    no duplicate characters, sense of isolation and cold`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 11: EL RESCATE
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-11-rescue-embrace.png",
        prompt: `${PREMIUM_STYLE}. 
    Emotional climax scene: ${CHARACTERS.gerda} embracing ${CHARACTERS.kay}
    in the ice palace, warm tears falling from her face (visible as droplets),
    ice around them beginning to melt creating puddles of light, the ice shard
    emerging from Kay's eye as a tiny sparkle of light, Kay's expression
    softening as he recognizes Gerda, his eyes returning from ice-blue to
    warm brown, warm golden light breaking through cracks in the ice walls,
    impossible red roses blooming through the melting ice in foreground,
    contrast between cold blue ice and warm golden light, emotional intensity,
    no duplicate characters, clear facial expressions, hope and love theme,
    cinematic lighting, moment of transformation`
    },

    // ─────────────────────────────────────────────────────────────
    // SECCIÓN 12: REGRESO A CASA
    // ─────────────────────────────────────────────────────────────
    {
        filename: "scene-12-spring-return.png",
        prompt: `${PREMIUM_STYLE}. 
    Joyful finale: ${CHARACTERS.gerda} and ${CHARACTERS.kay} (now teenagers,
    slightly older) back in the rose garden in full spring bloom, cherry
    blossom petals falling like snow, they are holding hands and smiling,
    surrounded by friends and family celebrating (background figures slightly
    blurred), warm golden sunlight streaming through, rainbow visible in the
    bright blue sky, butterflies everywhere, table with celebration feast,
    roses in full bloom, happiness radiating from the scene, warm color palette,
    sense of new beginning and hope, no duplicate main characters,
    clear composition with Gerda and Kay as focus, cinematic happy ending feel,
    depth of field with sharp focus on the main characters`
    }
];

// ═══════════════════════════════════════════════════════════════
// ELEMENTOS ADICIONALES - PERSONAJES INDIVIDUALES
// ═══════════════════════════════════════════════════════════════

const characterSheets = [
    {
        filename: "char-gerda-poses.png",
        prompt: `${PREMIUM_STYLE}. 
    Character design sheet: ${CHARACTERS.gerda} shown in 4 different poses
    and expressions: 1) Happy and playing, 2) Sad and crying, 3) Determined
    and brave, 4) Joyful reunion. Each pose clearly separated, consistent
    character design, white background, turnaround style, professional
    character reference sheet, no duplicates, clean layout`
    },

    {
        filename: "char-kay-transformation.png",
        prompt: `${PREMIUM_STYLE}. 
    Character transformation sheet: ${CHARACTERS.kay} shown in 3 stages:
    1) Normal happy boy with warm brown eyes, 2) Mid-transformation with
    one eye turning blue and cold expression, 3) Fully frozen with ice-blue
    eyes and emotionless face. Side-by-side comparison, consistent character,
    white background, professional reference, clear differences between stages`
    },

    {
        filename: "char-snow-queen-full.png",
        prompt: `${PREMIUM_STYLE}. 
    Character portrait: ${CHARACTERS.snowQueen} full body, standing regally,
    intricate ice gown details visible, flowing white hair, ice crown,
    cold blue magical aura around her, dramatic pose, dark background with
    northern lights, single character only, no duplicates, masterpiece quality,
    detailed textures on ice dress`
    }
];

// ═══════════════════════════════════════════════════════════════
// ELEMENTOS DECORATIVOS
// ═══════════════════════════════════════════════════════════════

const decorativeElements = [
    {
        filename: "element-snowflakes-pack.png",
        prompt: `${PREMIUM_STYLE}. 
    Design asset pack: Collection of 15 unique intricate snowflake designs,
    each with different geometric patterns, varying sizes from small to large,
    highly detailed crystalline structure, some glowing with soft blue light,
    some with sparkles, all on transparent background, ultra high detail,
    suitable for web animation, symmetrical beauty, professional quality,
    no duplicates of the same design`
    },

    {
        filename: "element-roses-pack.png",
        prompt: `${PREMIUM_STYLE}. 
    Botanical illustration pack: 12 beautiful roses in various stages
    (buds, half-open, full bloom), individual rose petals in different
    angles, leaves and stems with natural curves, pink and deep red colors,
    delicate details, transparent background, suitable for scattering animation,
    professional botanical art quality, variety of sizes and angles`
    },

    {
        filename: "element-ice-crystals.png",
        prompt: `${PREMIUM_STYLE}. 
    Ice crystal asset pack: Various ice formations including icicles of
    different lengths, ice shards in sharp angles, crystalline structures,
    frost patterns, frozen textures, all with blue-white translucent color,
    some with internal glow, transparent background, ultra detailed,
    suitable for UI and animation overlays, 10+ unique pieces`
    },

    {
        filename: "element-magic-sparkles.png",
        prompt: `${PREMIUM_STYLE}. 
    Magical particle effects pack: Various magical sparkle and light effects,
    star bursts, glowing orbs, fairy dust trails, magical twinkles, light
    rays, varying sizes and intensities, golden and white colors with some
    blue accents, transparent background, suitable for adding magical touches
    to animations, 20+ unique elements`
    }
];

// ═══════════════════════════════════════════════════════════════
// BACKGROUNDS PARA PARALLAX
// ═══════════════════════════════════════════════════════════════

const backgrounds = [
    {
        filename: "bg-aurora-sky.png",
        prompt: `${PREMIUM_STYLE}. 
    Atmospheric panoramic background: Beautiful aurora borealis (northern lights)
    dancing across a deep blue to purple night sky, ribbons of green, blue,
    and purple light creating waves and curves, stars visible throughout,
    subtle color gradients, ethereal glow, seamless tileable horizontal design,
    NO ground visible - pure sky only, 4K ultra-wide format (3840x1080),
    suitable for parallax scrolling background, magical atmosphere`
    },

    {
        filename: "bg-winter-forest-layers.png",
        prompt: `${PREMIUM_STYLE}. 
    Layered forest background for parallax: Nordic winter forest with
    snow-covered pine trees arranged in 4 distinct depth layers
    (far background, mid-back, mid-front, foreground), each layer clearly
    separated for parallax animation, morning mist between layers, varying
    tree sizes appropriate to depth, subtle blue tones, seamless horizontal
    edges for scrolling, panoramic format (3840x1080), atmospheric perspective,
    no characters, clean separation between layers`
    },

    {
        filename: "bg-spring-garden.png",
        prompt: `${PREMIUM_STYLE}. 
    Panoramic spring garden background: Lush garden with blooming flowers,
    green grass, rose bushes, arranged in layers for parallax effect,
    warm golden sunlight, blue sky with white clouds, depth indicated by
    scale and blur, seamless horizontal tileable design, vibrant spring
    colors, ultra-wide format (3840x1080), suitable for scrolling background`
    }
];

// ═══════════════════════════════════════════════════════════════
// FUNCIÓN DE GENERACIÓN MEJORADA
// ═══════════════════════════════════════════════════════════════

async function generateImage(prompt, filename, size = "1792x1024") {
    console.log(`\n🎨 Generating: ${filename}...`);
    console.log(`📝 Prompt length: ${prompt.length} characters`);

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: size,
            quality: "hd",
            style: "natural"
        });

        const imageUrl = response.data[0].url;

        // Download image
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();

        // Save to public/images/story/
        const outputPath = path.join(__dirname, '..', 'public', 'images', 'story', filename);
        fs.writeFileSync(outputPath, Buffer.from(buffer));

        console.log(`✅ Successfully saved: ${filename}`);

        // Rate limit: wait 12 seconds between requests (safe margin)
        console.log(`⏳ Waiting 12 seconds before next generation...`);
        await new Promise(resolve => setTimeout(resolve, 12000));

    } catch (error) {
        console.error(`\n❌ Error generating ${filename}:`);
        console.error(`   Message: ${error.message}`);
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Data: ${JSON.stringify(error.response.data)}`);
        }

        // Wait even on error before continuing
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// ═══════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════

async function generateAllImages() {
    // Create directory if it doesn't exist
    const dir = path.join(__dirname, '..', 'public', 'images', 'story');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }

    const allPrompts = [
        ...scenesPrompts,
        ...characterSheets,
        ...decorativeElements,
        ...backgrounds
    ];

    console.log('\n🚀 PREMIUM IMAGE GENERATION STARTED');
    console.log(`════════════════════════════════════════════`);
    console.log(`📊 Total images to generate: ${allPrompts.length}`);
    console.log(`⏱️  Estimated time: ${Math.ceil((allPrompts.length * 12) / 60)} minutes`);
    console.log(`💰 Estimated cost: $${(allPrompts.length * 0.08).toFixed(2)} USD`);
    console.log(`════════════════════════════════════════════\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < allPrompts.length; i++) {
        const { prompt, filename } = allPrompts[i];
        console.log(`\n[${i + 1}/${allPrompts.length}] Processing...`);

        try {
            await generateImage(prompt, filename);
            successCount++;
        } catch (error) {
            failCount++;
            console.error(`Failed to generate ${filename}`);
        }
    }

    console.log('\n════════════════════════════════════════════');
    console.log('🎉 IMAGE GENERATION COMPLETE!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📁 Location: public/images/story/`);
    console.log('════════════════════════════════════════════\n');
}

// ═══════════════════════════════════════════════════════════════
// EJECUTAR
// ═══════════════════════════════════════════════════════════════

generateAllImages().catch(console.error);

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env.local') });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ═══════════════════════════════════════════════════════════════
// ESTILO 2D ILUSTRACIÓN CINEMATOGRÁFICA - COMO LAS PELÍCULAS
// ═══════════════════════════════════════════════════════════════

const CINEMA_2D_STYLE = `
High-quality 2D digital illustration, professional animation style,
painterly textures with soft brush strokes, inspired by Disney concept art
and Studio Ghibli, rich detailed rendering, expressive character design,
atmospheric lighting, hand-painted quality, children's book illustration
elevated to cinematic level, warm color palette, detailed costume textures,
trending on ArtStation, professional character design sheet quality,
NO 3D render, pure 2D illustration art
`;

// ═══════════════════════════════════════════════════════════════
// PERSONAJES PRINCIPALES - MÚLTIPLES POSES
// ═══════════════════════════════════════════════════════════════

const mainCharacters = [

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // GERDA - PROTAGONISTA
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
        filename: "gerda-01-standing-happy.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of young girl Gerda, age 10-12 years old,
    long blonde hair in two neat braids with red ribbons tied at the ends,
    bright sparkling blue eyes full of warmth and determination, rosy cheeks,
    wearing a distinctive bright RED HOODED CLOAK over a simple cream-colored
    medieval peasant dress with brown lacing, brown boots,
    STANDING UPRIGHT with relaxed posture, arms at sides, HAPPY SMILE,
    front-facing view showing full body from head to feet,
    soft natural lighting, warm atmosphere, isolated character on PLAIN WHITE BACKGROUND,
    clean edges perfect for cut-out, NO shadows on ground, professional character sheet quality,
    detailed fabric textures on cloak and dress, expressive face`
    },

    {
        filename: "gerda-02-walking-determined.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids with red ribbons, red hooded cloak),
    WALKING POSE viewed from slight angle, left leg forward mid-stride,
    right arm swinging naturally, red cloak flowing gently behind her,
    DETERMINED EXPRESSION with focused eyes looking ahead, slight frown of concentration,
    wind catching her hair and cloak edges, sense of movement and purpose,
    isolated on PLAIN WHITE BACKGROUND, no ground shadows, clean cut-out ready,
    detailed illustration, warm lighting on her face`
    },

    {
        filename: "gerda-03-running-urgent.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids, red hooded cloak),
    RUNNING POSE leaning forward dynamically, both arms pumping in running motion,
    hair braids flying back, red cloak billowing dramatically behind her,
    URGENT WORRIED EXPRESSION, mouth slightly open, searching look in eyes,
    sense of speed and urgency, action lines suggestion minimal,
    isolated on PLAIN WHITE BACKGROUND, professional animation frame quality`
    },

    {
        filename: "gerda-04-kneeling-crying.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids, red hooded cloak),
    KNEELING on both knees, hands covering face, shoulders hunched,
    visible tears streaming down between fingers, body language showing grief,
    cloak pooled around her on ground, braids falling forward,
    EMOTIONAL SAD SCENE, vulnerable postule, soft sympathetic lighting,
    isolated on PLAIN WHITE BACKGROUND, tender emotional illustration`
    },

    {
        filename: "gerda-05-arms-open-joy.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids, red hooded cloak),
    STANDING with BOTH ARMS WIDE OPEN in welcoming embrace gesture,
    BIG RADIANT JOYFUL SMILE, eyes sparkling with tears of happiness,
    leaning slightly forward ready to embrace, cloak spread open,
    pure love and relief in expression, warm golden light on her face,
    isolated on PLAIN WHITE BACKGROUND, reunion moment capture`
    },

    {
        filename: "gerda-06-hugging-tender.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids, red hooded cloak),
    HUGGING POSE with arms wrapped forward embracing invisible person,
    eyes CLOSED PEACEFULLY, gentle loving smile, head slightly tilted,
    tender emotional expression, cloak wrapped around in embrace,
    soft warm lighting, feeling of love and relief,
    isolated on PLAIN WHITE BACKGROUND, perfect for compositing embrace scene`
    },

    {
        filename: "gerda-07-pointing-discovery.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids, red hooded cloak),
    STANDING and POINTING forward with right arm fully extended and finger pointing,
    EXCITED SURPRISED EXPRESSION with wide eyes and open mouth smile,
    left hand on chest in gesture of awe, leaning forward slightly,
    discovering something wonderful, enthusiastic body language,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "gerda-08-looking-up-wonder.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Gerda (blonde braids, red hooded cloak),
    STANDING looking UP toward sky, head tilted back, neck exposed,
    MOUTH OPEN IN AWE, eyes wide with wonder and amazement,
    both hands clasped together at chest in reverent gesture,
    sense of seeing something magical above, soft upward lighting on face,
    isolated on PLAIN WHITE BACKGROUND`
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // KAY - VERSIÓN NORMAL (Antes del Hechizo)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
        filename: "kay-normal-01-standing-happy.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of young boy Kay, age 10-12 years old,
    messy brown hair with natural texture, WARM BROWN EYES full of life,
    friendly open smile showing teeth slightly, rosy healthy cheeks,
    wearing simple medieval peasant outfit: cream tunic with brown suspenders,
    brown pants, leather boots, natural relaxed posture,
    STANDING with hands in pockets or at sides casually, HAPPY CAREFREE EXPRESSION,
    front-facing view, warm friendly personality visible,
    isolated on PLAIN WHITE BACKGROUND, clean edges, professional character design`
    },

    {
        filename: "kay-normal-02-laughing-playing.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay (messy brown hair, warm brown eyes),
    JUMPING PLAYFULLY with both feet slightly off ground, arms spread wide,
    HEAD TILTED BACK LAUGHING joyfully with mouth wide open, eyes squinted in mirth,
    hair bouncing with motion, clothes slightly disheveled from play,
    pure childhood joy and carefreeness, energetic happy pose,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "kay-normal-03-waving-friendly.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay (messy brown hair, warm brown eyes),
    STANDING and WAVING with right hand raised high above head,
    BIG FRIENDLY SMILE, welcoming gesture, left hand on hip,
    open friendly body language, warm approachable expression,
    isolated on PLAIN WHITE BACKGROUND`
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // KAY - VERSIÓN CONGELADA (Después del Hechizo)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
        filename: "kay-frozen-01-standing-cold.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay but TRANSFORMED by ice magic,
    same messy brown hair but now with frost tips, EYES CHANGED TO ICE-BLUE COLOR,
    pupils dilated and cold, PALE SKIN with slight blue undertones,
    COMPLETELY EMOTIONLESS BLANK EXPRESSION, no smile, vacant stare,
    STANDING RIGIDLY STRAIGHT with arms hanging stiffly at sides,
    robotic posture, no life in body language, same peasant outfit but colors muted,
    subtle frost particles and ice crystals around him, cold blue lighting,
    isolated on PLAIN WHITE BACKGROUND, chilling transformation visible`
    },

    {
        filename: "kay-frozen-02-sitting-puzzles.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay with ice-blue eyes and emotionless face,
    SITTING CROSS-LEGGED on ground, hunched over slightly,
    hands positioned as if arranging puzzle pieces in front of him,
    FOCUSED but COLD EXPRESSION, mechanical concentration without joy,
    pale skin, lifeless posture, obsessive body language,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "kay-frozen-03-walking-stiff.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay with ice-blue eyes,
    WALKING with STIFF MECHANICAL GAIT like a puppet,
    arms hanging limply not swinging naturally, BLANK ZOMBIE-LIKE EXPRESSION,
    lifeless eyes staring ahead, slow deliberate steps,
    no natural human movement flow, eerie unnatural walk,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "kay-frozen-04-transition-awakening.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay in TRANSFORMATION MOMENT,
    eyes HALF BROWN HALF ICE-BLUE showing the change happening,
    CONFUSED DAZED EXPRESSION as emotion starts returning,
    one hand touching his own face in confusion, slightly hunched posture,
    torn between frozen and normal state, frost particles dissipating,
    skin color warming up on one side, critical transformation scene,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "kay-normal-04-crying-relief.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay (now with warm brown eyes again),
    STANDING with TEARS STREAMING DOWN FACE, hand on chest over heart,
    SMILE THROUGH TEARS showing relief and emotional release,
    shoulders relaxed, freed from ice spell, color fully returned to cheeks,
    eyes shining with tears and life, finally himself again,
    isolated on PLAIN WHITE BACKGROUND, emotional breakthrough moment`
    },

    {
        filename: "kay-normal-05-hugging-grateful.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Kay (warm brown eyes),
    HUGGING POSE with arms wrapped forward embracing invisible person,
    EYES CLOSED with tears on cheeks, EMOTIONAL SMILE of gratitude and love,
    head tilted into embrace, body relaxed and warm,
    tender reunion moment, freed from coldness,
    isolated on PLAIN WHITE BACKGROUND`
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // REINA DE LAS NIEVES - ANTAGONISTA MAJESTUOSA
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
        filename: "snow-queen-01-standing-regal.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of The Snow Queen, tall elegant immortal woman,
    IMPOSSIBLY LONG FLOWING WHITE-SILVER HAIR cascading down past her feet,
    hair seems to have life of its own with ethereal movement,
    PIERCING ICE-BLUE EYES with no warmth, cold penetrating gaze,
    PALE LUMINESCENT SKIN like porcelain, flawless and inhuman,
    wearing ELABORATE GOWN made of ice crystals, frost, and snowflakes,
    dress has intricate geometric ice patterns, translucent layers,
    SHARP DELICATE ICE CROWN on head with crystal spikes,
    STANDING PERFECTLY UPRIGHT in regal pose, one hand extended gracefully,
    cold powerful presence, no smile, serene but dangerous beauty,
    subtle BLUE MAGICAL AURA around her, ethereal glow,
    isolated on PLAIN WHITE BACKGROUND, professional character design,
    queenly majesty, terrifying beauty`
    },

    {
        filename: "snow-queen-02-arms-commanding.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Snow Queen (long white hair, ice gown),
    STANDING with BOTH ARMS OUTSTRETCHED wide to sides in commanding gesture,
    IMPERIOUS EXPRESSION looking down with cold superiority,
    head held high, chin lifted, ice crown glinting,
    translucent ice cape spreading dramatically with arms,
    summoning ice magic, blue magical energy swirling around hands,
    powerful commanding stance, absolute authority,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "snow-queen-03-sitting-throne.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Snow Queen (long white hair, ice gown),
    SITTING in regal throne pose without throne visible, back perfectly straight,
    one leg crossed elegantly, hands resting on invisible armrests,
    COLD SERENE EXPRESSION looking down at viewer with disdain,
    hair pooling around her like liquid silver, ice dress spreading,
    queenly composed posture, untouchable majesty,
    isolated on PLAIN WHITE BACKGROUND, ready for throne compositing`
    },

    {
        filename: "snow-queen-04-walking-gliding.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Snow Queen (long white hair, ice gown),
    GLIDING FORWARD as if floating just above ground, feet barely touching,
    dress and hair flowing dramatically behind her in ethereal wind,
    arms at sides gracefully, SERENE COLD EXPRESSION,
    supernatural gliding movement, effortless grace,
    ice particles trailing behind, magical ethereal motion,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "snow-queen-05-pointing-decree.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of Snow Queen (long white hair, ice gown),
    STANDING and POINTING FORWARD with one arm extended, finger pointing,
    COLD STERN EXPRESSION giving orders, commanding gesture,
    ice magic emanating from pointing finger, other hand at side,
    absolute authority in posture, regal and dangerous,
    isolated on PLAIN WHITE BACKGROUND`
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PERSONAJES SECUNDARIOS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    {
        filename: "witch-01-standing-welcoming.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of kind elderly witch woman,
    long flowing gray hair with natural waves, warm wrinkled face with grandmother smile,
    wearing LARGE STRAW SUN HAT decorated with fresh flowers,
    flowing earth-tone dress in browns and greens with floral embroidery,
    STANDING with arms open in welcoming gesture, friendly warm expression,
    magical but benevolent presence, gentle eyes, surrounded by faint floral magic,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "witch-02-gardening-tending.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of elderly witch (gray hair, sun hat, floral dress),
    BENDING SLIGHTLY with hands positioned holding invisible watering can,
    tending to invisible plants, PEACEFUL CONTENT EXPRESSION,
    caring grandmother energy, gardening pose, loving gesture,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "robber-girl-01-standing-fierce.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of wild robber girl age 12-14,
    MESSY WILD DARK BROWN HAIR with natural tangles, intense green eyes,
    wearing practical LEATHER VEST over shirt, leather pants, fur-lined boots,
    small DAGGER visible at belt, STANDING with hands on hips confidently,
    FIERCE but not evil expression, mischievous grin, tough exterior,
    competent and independent body language, wild child of the forest,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "robber-girl-02-sitting-relaxed.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of robber girl (messy hair, leather outfit),
    SITTING CROSS-LEGGED on ground, leaning back on hands casually,
    SMIRK on face, relaxed but alert posture, confident ease,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "robber-girl-03-threatening-playful.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of robber girl (messy hair, leather outfit),
    STANDING in aggressive stance, holding small dagger pointed forward,
    PLAYFULLY THREATENING EXPRESSION, not truly dangerous but testing,
    mischievous glint in eyes, theatrical toughness,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "princess-01-sitting-graceful.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of young princess age 18-20,
    elaborate updo hairstyle with jeweled tiara, kind gentle eyes,
    wearing ROYAL GOWN with gold embroidery, jewels, and rich fabrics,
    SITTING GRACEFULLY in throne pose, back straight, hands folded in lap,
    SERENE ROYAL EXPRESSION, kind but dignified, regal bearing,
    warm but formal presence, elegant posture,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "princess-02-standing-welcoming.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of princess (updo hair, royal gown, tiara),
    STANDING with one hand extended in welcoming gesture,
    WARM GRACIOUS SMILE, approachable despite royal status,
    kind expression, royal but not haughty,
    isolated on PLAIN WHITE BACKGROUND`
    }
];

// ═══════════════════════════════════════════════════════════════
// ANIMALES COMPAÑEROS
// ═══════════════════════════════════════════════════════════════

const animalCharacters = [

    {
        filename: "reindeer-01-standing-majestic.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of majestic reindeer,
    LARGE MAGNIFICENT ANTLERS with many points, brown fur with natural texture,
    KIND INTELLIGENT EYES showing wisdom, strong muscular body,
    STANDING PROUDLY on all four legs, noble posture,
    loyal companion appearance, gentle but powerful presence,
    isolated on PLAIN WHITE BACKGROUND, detailed animal illustration`
    },

    {
        filename: "reindeer-02-lying-resting.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of reindeer (large antlers, brown fur),
    LYING DOWN with legs folded under body, head held up alertly,
    PEACEFUL RESTING POSE but still watchful, ears perked,
    calm content expression, gentle companion,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "reindeer-03-running-galloping.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of reindeer (large antlers, brown fur),
    GALLOPING at full speed with all legs in dynamic running motion,
    antlers swept back, ears flat, DETERMINED EXPRESSION,
    powerful muscles visible, sense of speed and strength,
    isolated on PLAIN WHITE BACKGROUND, action pose`
    },

    {
        filename: "white-fox-01-sitting-curious.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of small white arctic fox,
    fluffy pure white fur, LARGE CURIOUS BLUE EYES, small black nose,
    SITTING with bushy tail wrapped around paws, head tilted cutely,
    adorable inquisitive expression, small companion animal,
    isolated on PLAIN WHITE BACKGROUND, charming detailed animal art`
    },

    {
        filename: "white-fox-02-playing-jumping.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of white arctic fox (fluffy white fur, blue eyes),
    JUMPING PLAYFULLY with all four paws off ground, tail straight up,
    HAPPY PLAYFUL EXPRESSION, mouth open in fox smile,
    energetic joyful pose, adorable companion,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "crow-01-perched-watchful.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of intelligent black crow,
    glossy black feathers with blue-purple iridescence, sharp yellow beak,
    PERCHED on invisible branch, one foot raised, wings folded,
    INTELLIGENT WATCHFUL EXPRESSION with knowing eyes,
    mysterious companion bird, detailed feather textures,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "crow-02-flying-wings-spread.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of black crow (glossy feathers),
    FLYING with wings spread wide, tail fanned for balance,
    detailed wing feathers visible, dynamic flight pose,
    isolated on PLAIN WHITE BACKGROUND, ready for animation`
    },

    {
        filename: "dove-01-flying-peaceful.png",
        prompt: `${CINEMA_2D_STYLE}.
    Full body 2D illustration of white dove,
    pure white feathers, gentle eyes, olive branch in beak,
    FLYING with wings spread gracefully, peaceful serene presence,
    symbol of hope and peace, soft gentle creature,
    isolated on PLAIN WHITE BACKGROUND`
    },

    {
        filename: "butterfly-pack.png",
        prompt: `${CINEMA_2D_STYLE}.
    Collection of 8 beautiful butterflies in various poses,
    different species with colorful wings (monarchs, swallowtails, blues),
    some with wings open, some closed, some mid-flight,
    delicate detailed wing patterns, various sizes,
    isolated on PLAIN WHITE BACKGROUND, ready for scene animation`
    },

    {
        filename: "songbirds-pack.png",
        prompt: `${CINEMA_2D_STYLE}.
    Collection of 6 small songbirds (robins, sparrows, finches),
    various poses: perched, singing, flying, landing,
    colorful plumage, cute expressions, different angles,
    isolated on PLAIN WHITE BACKGROUND, scene companions`
    }
];

// ═══════════════════════════════════════════════════════════════
// FUNCIÓN DE GENERACIÓN
// ═══════════════════════════════════════════════════════════════

async function generateImage(prompt, filename) {
    console.log(`\n🎨 Generating: ${filename}...`);

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "hd",
            style: "natural"
        });

        const imageUrl = response.data[0].url;
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.arrayBuffer();

        const outputPath = path.join(__dirname, '..', 'public', 'images', 'characters', filename);
        fs.writeFileSync(outputPath, Buffer.from(buffer));

        console.log(`✅ Saved: ${filename}`);
        await new Promise(resolve => setTimeout(resolve, 12000));

    } catch (error) {
        console.error(`❌ Error: ${filename} - ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

async function generateAllCharacters() {
    const dir = path.join(__dirname, '..', 'public', 'images', 'characters');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    console.log('\n🚀 2D CHARACTER GENERATION - CINEMA QUALITY');
    console.log('════════════════════════════════════════════\n');

    console.log('📦 Generating MAIN CHARACTERS...\n');
    for (const { prompt, filename } of mainCharacters) {
        await generateImage(prompt, filename);
    }

    console.log('\n📦 Generating ANIMAL COMPANIONS...\n');
    for (const { prompt, filename } of animalCharacters) {
        await generateImage(prompt, filename);
    }

    console.log('\n════════════════════════════════════════════');
    console.log('🎉 ALL CHARACTERS GENERATED!');
    console.log('════════════════════════════════════════════\n');
}

generateAllCharacters().catch(console.error);

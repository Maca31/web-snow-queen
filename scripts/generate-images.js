/* 
 * scripts/generate-images.js
 * Generador de imágenes para "La Reina de las Nieves" dentro de web-snow-queen
 */

require("dotenv").config?.();

const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Falta la variable de entorno OPENAI_API_KEY.");
  console.error(
    "   Configúrala en .env.local (OPENAI_API_KEY=...) o en tu terminal antes de ejecutar este script."
  );
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const STYLE_PRESET =
  "Enchanting Nordic fairy tale illustration, ethereal and dreamlike, soft painterly textures, inspired by Kay Nielsen and Arthur Rackham, subtle gradients, magical luminescence, children's book illustration style, whimsical yet sophisticated, rich details, atmospheric depth, 8K quality, no text, no frames";

const imagePrompts = [
  {
    filename: "01-intro-title.png",
    prompt: `${STYLE_PRESET}. Magical title scene: Ornate frozen typography 'The Snow Queen' made of crystalline ice and frost, surrounded by delicate snowflakes dancing in aurora borealis light, deep blue night sky, ethereal glow, mystical winter wonderland, stars twinkling, bokeh effects, ultra detailed ice crystals`,
  },
  {
    filename: "02-devil-mirror.png",
    prompt: `${STYLE_PRESET}. Sinister scene: A large ornate gothic mirror with dark swirling magic inside, evil troll-like creatures holding it, the mirror reflects distorted reality, dark purple and black tones, magical sparkles turning into dark shards, ominous atmosphere, dramatic lighting, the mirror beginning to crack with golden light seeping through`,
  },
  {
    filename: "03-garden-happiness.png",
    prompt: `${STYLE_PRESET}. Joyful summer scene: Beautiful rooftop rose garden in full bloom, pink and red roses everywhere, two happy children (Gerda with blonde braids and Kay with brown hair) playing among flowers, warm golden sunlight, butterflies, wooden benches, cobblestone houses in background, peaceful and idyllic, vibrant colors, soft afternoon light`,
  },
  {
    filename: "04-shard-eye.png",
    prompt: `${STYLE_PRESET}. Dramatic moment: Close-up of young boy Kay's face showing pain as a tiny glimmering ice shard enters his eye, his expression changing from joy to coldness, roses wilting in background, color draining from the scene, transition from warm to cold tones, magical ice crystal visible, moment frozen in time`,
  },
  {
    filename: "05-snow-queen-arrival.png",
    prompt: `${STYLE_PRESET}. Majestic and ethereal: The Snow Queen arriving on an elaborate ice sleigh pulled by translucent white horses, she is impossibly beautiful and cold, wearing a gown made of frost and snowflakes, long flowing white-silver hair, ice crown, Kay mesmerized sitting beside her, swirling snowstorm, magical ice trail, northern lights in sky, breathtaking beauty mixed with danger`,
  },
  {
    filename: "06-gerda-river.png",
    prompt: `${STYLE_PRESET}. Melancholic adventure scene: Young Gerda in a red cloak sitting in a small wooden boat floating down a winding river, releasing her red shoes as an offering, willow trees hanging over water, lily pads, gentle ripples, misty morning atmosphere, determination in her expression, birds flying overhead, reflective water surface`,
  },
  {
    filename: "07-witch-garden.png",
    prompt: `${STYLE_PRESET}. Enchanted mysterious scene: Overgrown magical garden with enormous vibrant flowers (taller than a child), each flower with a subtle face, kind old witch with a large sun hat tending to flowers, cottage with curved roof and round windows, Gerda walking through surrounded by blooming flora, warm sunset colors, dreamy haze, flowers seem alive and watching`,
  },
  {
    filename: "08-palace-gold.png",
    prompt: `${STYLE_PRESET}. Opulent scene: Grand golden palace interior with high ornate ceilings, marble columns, crystal chandeliers, a prince and princess on elegant chairs, Gerda in simple clothes standing before them, guards in ceremonial dress, rich red carpets, warm candlelight, baroque architecture, contrast between Gerda's simplicity and palace luxury`,
  },
  {
    filename: "09-robber-girl.png",
    prompt: `${STYLE_PRESET}. Wild forest scene: Dark Nordic forest at night, fierce young robber girl with wild dark hair and leather outfit, tamed reindeer with large antlers beside her, rustic hideout with torches, Gerda sitting by firelight, rough wooden structures, moonlight filtering through pine trees, sense of danger and unexpected friendship, Nordic wilderness`,
  },
  {
    filename: "10-ice-palace.png",
    prompt: `${STYLE_PRESET}. Breathtaking frozen scene: Colossal ice palace made entirely of crystalline ice and snow, geometric ice architecture, towering spires reaching into aurora-filled sky, everything glowing with inner blue light, frozen lake surrounding it, ice sculptures, absolute cold and beauty, Kay sitting alone in the vast frozen throne room arranging ice pieces, tiny against the enormity, pristine and terrifying beauty`,
  },
  {
    filename: "11-rescue-tears.png",
    prompt: `${STYLE_PRESET}. Emotional climax: Gerda embracing Kay in the ice palace, her warm tears falling on his frozen face, ice beginning to melt around them creating puddles of light, the ice shard emerging from his eye as a tiny sparkle, Kay's expression softening and recognizing Gerda, warm golden light breaking through ice walls, roses blooming impossibly through ice cracks, love melting the curse`,
  },
  {
    filename: "12-homecoming-spring.png",
    prompt: `${STYLE_PRESET}. Joyful finale: Gerda and Kay returned home, back in the rose garden now in full spring bloom, cherry blossoms falling like snow, they're slightly older now (teenagers), holding hands surrounded by friends and family celebrating, warm sunlight, rainbow in the sky, butterflies everywhere, table with celebration feast, happiness and warmth radiating from the scene, promise of new beginning`,
  },
  {
    filename: "character-gerda.png",
    prompt: `${STYLE_PRESET}. Narrative character portrait: Gerda, a brave young girl with long blonde braids and a red cloak over a simple dress. She is walking forward with a determined yet kind expression. Soft painterly textures, watercolor-like brushstrokes. High contrast. Isolated on a solid white background. Single full-body pose, No turnaround, No character sheet, No multiple angles.`,
  },
  {
    filename: "character-kay.png",
    prompt: `${STYLE_PRESET}. Narrative character portrait: Kay, a young boy with messy brown hair and simple peasant clothes. Two separate versions: one where he is laughing warmly, and another where his eyes are a cold icy blue and his expression is distant. Pure storybook style. Isolated on a solid white background. Single full-body poses, No character sheet, No multiple angles per character.`,
  },
  {
    filename: "character-snow-queen.png",
    prompt: `${STYLE_PRESET}. Narrative character portrait: The Snow Queen in all her majestic beauty. She wears a crystalline crown and a gown made of shimmering frost. Long silver-white hair flowing. Regal and cold expression. Highly detailed ice textures. Isolated on a solid white background. Single full-body pose, No character sheet, No multiple angles.`,
  },
  {
    filename: "elements-snowflakes.png",
    prompt: `${STYLE_PRESET}. Design elements sheet: Collection of various intricate snowflake designs, each unique and highly detailed, different sizes, some glowing, some crystalline, some with magical sparkles, transparent background, ultra high detail, suitable for animation and layering, 20+ variations, symmetrical geometric beauty`,
  },
  {
    filename: "elements-ice-crystals.png",
    prompt: `${STYLE_PRESET}. Design elements sheet: Various ice crystal formations, icicles of different sizes, frost patterns, frozen textures, ice shards, crystalline structures, some sharp, some smooth, transparent with blue-white tints, glowing effects, suitable for UI and animation elements, 15+ variations`,
  },
  {
    filename: "elements-roses.png",
    prompt: `${STYLE_PRESET}. Design elements sheet: Beautiful roses in various stages of bloom, rose petals falling, rose buds, leaves, stems with thorns, pink and red varieties, some wilting, some fresh, transparent background, suitable for scattering and animation, 15+ variations, delicate and detailed`,
  },
  {
    filename: "bg-aurora.png",
    prompt: `${STYLE_PRESET}. Atmospheric background: Stunning aurora borealis (northern lights) dancing across a deep blue night sky, ribbons of green, purple, and blue light, stars visible, subtle color gradients, ethereal glow, panoramic wide format, seamless tileable, no ground visible, pure sky, magical atmosphere, 4K resolution`,
  },
  {
    filename: "bg-winter-forest.png",
    prompt: `${STYLE_PRESET}. Atmospheric background: Misty Nordic winter forest with snow-covered pine trees, depth layers for parallax, fog between trees, subtle moonlight, various tree sizes from foreground to background, seamless edges for scrolling, no characters, pristine snow, atmospheric perspective, 4K panoramic`,
  },
];

async function generateImage(prompt, filename) {
  console.log(`🎨 Generando: ${filename}...`);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      style: "natural",
    });

    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error("La API no devolvió una URL de imagen.");
    }

    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Error descargando imagen: ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputDir = path.join(__dirname, "..", "public", "images", "story");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Guardada: ${filename}`);

    // Respetar rate limit: 10s entre peticiones
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  } catch (error) {
    console.error(`❌ Error generando ${filename}:`, error.message || error);
  }
}

async function generateAllImages() {
  console.log(`🚀 Iniciando generación de ${imagePrompts.length} imágenes...`);
  console.log(`⏱️  Tiempo estimado: ${(imagePrompts.length * 10) / 60} minutos\n`);

  for (const { prompt, filename } of imagePrompts) {
    await generateImage(prompt, filename);
  }

  console.log("\n🎉 ¡Todas las imágenes han sido generadas!");
}

generateAllImages().catch((err) => {
  console.error("❌ Error inesperado en la generación de imágenes:", err);
  process.exit(1);
});


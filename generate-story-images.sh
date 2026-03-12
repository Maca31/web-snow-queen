#!/usr/bin/env bash

set -euo pipefail

echo "📖 Generador de imágenes - La Reina de las Nieves (web-snow-queen)"

# Ir al directorio donde está este script (raíz del proyecto)
cd "$(dirname "$0")"

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "❌ La variable de entorno OPENAI_API_KEY no está definida."
  echo "   Define tu clave antes de ejecutar este script, por ejemplo:"
  echo "   export OPENAI_API_KEY=\"TU_API_KEY_AQUI\""
  exit 1
fi;

if [[ ! -d node_modules ]]; then
  echo "📦 Instalando dependencias (npm install)..."
  npm install
fi

echo "🎨 Generando imágenes con npm run generate-images..."
npm run generate-images

echo "✅ Proceso completado. Las imágenes se guardan en web-snow-queen/public/images/story/"


Param(
  [string]$OpenAIApiKey
)

Write-Host "📖 Generador de imágenes - La Reina de las Nieves (web-snow-queen)" -ForegroundColor Cyan

# Ir a la carpeta donde está este script (raíz del proyecto web-snow-queen)
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Path)

if (-not $env:OPENAI_API_KEY -and -not $OpenAIApiKey) {
    Write-Host "❌ No se encontró OPENAI_API_KEY." -ForegroundColor Red
    Write-Host "   Defínela en .env.local o en esta sesión, o pásala como parámetro." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Ejemplos:" -ForegroundColor Yellow
    Write-Host '$env:OPENAI_API_KEY = "TU_API_KEY_AQUI"' -ForegroundColor Gray
    Write-Host '.\generate-story-images.ps1 -OpenAIApiKey "TU_API_KEY_AQUI"' -ForegroundColor Gray
    exit 1
}

if ($OpenAIApiKey) {
    $env:OPENAI_API_KEY = $OpenAIApiKey
}

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias (npm install)..." -ForegroundColor Yellow
    npm install
}

Write-Host "🎨 Generando imágenes con npm run generate-images..." -ForegroundColor Cyan
npm run generate-images

Write-Host "✅ Proceso completado. Las imágenes se guardan en web-snow-queen/public/images/story/" -ForegroundColor Green


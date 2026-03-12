from rembg import remove
from PIL import Image
import os
import io
from pathlib import Path

def remove_background(input_path, output_path):
    """Remove background from image and save as PNG with transparency"""
    print(f"Processing: {os.path.basename(input_path)}")
    
    try:
        # Read image
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()
        
        # Remove background
        output_data = remove(
            input_data,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        # Save with transparency
        img = Image.open(io.BytesIO(output_data))
        img.save(output_path, 'PNG')
        print(f"✅ Saved: {os.path.basename(output_path)}")
    except Exception as e:
        print(f"❌ Error processing {os.path.basename(input_path)}: {str(e)}")

def process_directory(input_dir, output_dir):
    """Process all PNG images in directory"""
    
    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Process each image
    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.png') and not os.path.isdir(os.path.join(input_dir, filename)):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            remove_background(input_path, output_path)

if __name__ == '__main__':
    # Adjust these paths to your project structure
    base_path = Path(__file__).parent
    input_directory = base_path / 'public' / 'images' / 'characters'
    output_directory = base_path / 'public' / 'images' / 'characters' / 'transparent'
    
    print(f"\n🎨 Starting background removal...\n")
    process_directory(str(input_directory), str(output_directory))
    print(f"\n✨ Done! Check {output_directory}\n")

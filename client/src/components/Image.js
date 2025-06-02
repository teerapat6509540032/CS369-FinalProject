import * as fabric from 'fabric';

export const loadBackgroundImage = async (canvas, imageUrl) => {
    try {
        if (canvas && imageUrl) {
            const img = await fabric.Image.fromURL(imageUrl);
            img.selectable = false;
            img.evented = false;
            img.scaleX = canvas.width / img.width;
            img.scaleY = canvas.height / img.height;
            canvas.backgroundImage = img;
            canvas.requestRenderAll();
            console.log('Background image set');
        }
    } catch (err) {
        console.error('Error loading image:', err);
    }
}

export const uploadImage = async (canvas, file) => {
    try {
        if (canvas && file) {
            console.log('Uploading image:', file.name);
            const reader = new FileReader();
            reader.onload = async (e) => {
                const img = await fabric.Image.fromURL(e.target.result);
                img.scaleToWidth(150);
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.requestRenderAll();
            };
            reader.readAsDataURL(file);   
        }
    } catch (err) {
        console.error('Error uploading image:', err);
    }
}
import * as fabric from 'fabric';

export const addItem = (canvas, type) => {
    if (canvas) {
        let item;
        if (type === 'rect') {
            item = new fabric.Rect({
                left: 100,
                top: 100,
                fill: '#1976d2',
                width: 80,
                height: 60,
            });
        } else if (type === 'circle') {
            item = new fabric.Circle({
                left: 150,
                top: 150,
                fill: '#43a047',
                radius: 40,
            });
        } else if (type === 'triangle') {
            item = new fabric.Triangle({
                left: 200,
                top: 200,
                fill: '#fbc02d',
                width: 80,
                height: 80,
            });
        } else if (type === 'text') {
            item = new fabric.IText('Double click to edit', {
                left: 120,
                top: 120,
                fill: '#000',
                fontSize: 24,
                fontFamily: 'Arial',
            });
        }
        
        if (item) {
            canvas.add(item);
        }
    }
}

export const removeItem = (canvas) => {
    if (canvas) {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
            canvas.requestRenderAll();
        } else {
            console.warn('No active object to remove');
        }
    }
}


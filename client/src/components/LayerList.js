import React, { useEffect, useState } from 'react';
import * as fabric from 'fabric';

function LayerList({ canvas }) {
    const [layers, setLayers] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);

    const moveSelectedLayer = (direction) => {
        if(!selectedLayer) return;

        const objects = canvas.getObjects();
        const object = objects.find(obj => obj.id === selectedLayer);

        if(object){
            const currentIndex = objects.indexOf(object);

            if (direction === 'up' && currentIndex < objects.length - 1) {
                const temp = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex + 1];
                objects[currentIndex + 1] = temp;
            } else if (direction === 'down' && currentIndex > 0) {
                const temp = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex - 1];
                objects[currentIndex - 1] = temp;
            }
        }

        const backgroundImage = canvas.backgroundImage;

        canvas.clear();

        objects.forEach(obj => canvas.add(obj));

        canvas.backgroundImage = backgroundImage;

        canvas.requestRenderAll();

        objects.forEach((obj, index) => {
            obj.set('zIndex', index);
        });

        canvas.setActiveObject(object);

        canvas.requestRenderAll();

        updateLayers(); 
    }

    const addIdToObjects = (object) => {
        if (object && !object.id) {
            const timeStamp = new Date().getTime();
            object.id = `${object.type}_${timeStamp}`;
        }
        return object;
    }

    fabric.Canvas.prototype.updateZIndices = function () {
        const objects = this.getObjects();
        objects.forEach((obj, index) => {
            obj.set('zIndex', index);
            obj.set('id', addIdToObjects(obj).id);
        });
    }

    const handleObjectSelected = (e) => {
        const selectedObject = e.selected ? e.selected[0] : null;

        if (selectedObject) {
            setSelectedLayer(selectedObject.id);
        } else {
            setSelectedLayer(null);
        }
    }

    const updateLayers = () => {
        if (canvas) {
            canvas.updateZIndices();
            const objects = canvas
                .getObjects()
                .filter(obj =>
                    !(
                        obj.id.startsWith('vertical-') || obj.id.startsWith('horizontal-')
                    )
                ).map(obj => ({
                    id: obj.id,
                    type: obj.type,
                    zIndex: obj.zIndex
                }));
            setLayers([...objects].reverse());
        }
    }

    const selectLayerInCanvas = (layerId) => {
        const object = canvas.getObjects().find(obj => obj.id === layerId);
        if (object) {
            canvas.setActiveObject(object);
            canvas.requestRenderAll();
        }
    }

    useEffect(() => {
        if (canvas) {
            canvas.on('object:added', updateLayers);
            canvas.on('object:removed', updateLayers);
            canvas.on('object:modified', updateLayers);

            canvas.on('selection:created', handleObjectSelected);
            canvas.on('selection:updated', handleObjectSelected);
            canvas.on('selection:cleared', () => setSelectedLayer(null));

            updateLayers();

            return () => {
                canvas.off('object:added', updateLayers);
                canvas.off('object:removed', updateLayers);
                canvas.off('object:modified', updateLayers);

                canvas.off('selection:created', handleObjectSelected);
                canvas.off('selection:updated', handleObjectSelected);
                canvas.off('selection:cleared', () => setSelectedLayer(null));
            }
        }
    }, [canvas]);

    return (
        <div className="Settings">
            <label>Layers</label>
            <ul>
                {layers.map((layer) => (
                    <li
                        key={layer.id}
                        className={layer.id === selectedLayer ? 'layer-selected' : ''}
                        onClick={() => selectLayerInCanvas(layer.id)}
                    >
                        {layer.type} ({layer.zIndex})
                    </li>
                ))}
            </ul>
            <button className='layer-button' size="medium" onClick={() => moveSelectedLayer('up')} disabled={!selectedLayer|| layers[0]?.id === selectedLayer}>Up</button>
            <button className='layer-button' size="medium" onClick={() => moveSelectedLayer('down')} disabled={!selectedLayer || layers[layers.length - 1]?.id === selectedLayer}>Down</button>
        </div>
    );
}

export default LayerList;
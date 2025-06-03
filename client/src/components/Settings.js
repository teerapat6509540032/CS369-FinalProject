import React, { useEffect, useState } from 'react';

const Settings = ({ canvas }) => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [color, setColor] = useState('');
    const [fontSize, setFontSize] = useState('');

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (e) => {
                handleObjectSelection(e.selected[0]);
            });

            canvas.on('selection:updated', (e) => {
                handleObjectSelection(e.selected[0]);
            });

            canvas.on('selection:cleared', () => {
                setSelectedObject(null);
                clearSettings();
            });

            canvas.on('object:modified', (e) => {
                handleObjectSelection(e.target);
            });

            canvas.on('object:scaling', (e) => {
                handleObjectSelection(e.target);
            });
        }
    }, [canvas]);

    const handleObjectSelection = (obj) => {
        if (!obj) return;

        setSelectedObject(obj);

        if (obj.type === 'rect') {
            setWidth(Math.round(obj.width * obj.scaleX));
            setHeight(Math.round(obj.height * obj.scaleY));
            setColor(obj.fill);
            setDiameter('');
        } else if (obj.type === 'circle') {
            setWidth('');
            setHeight('');
            setDiameter(Math.round(obj.radius * obj.scaleX) * 2);
            setColor(obj.fill);
        } else if (obj.type === 'triangle') {
            setWidth(Math.round(obj.width * obj.scaleX));
            setHeight(Math.round(obj.height * obj.scaleY));
            setColor(obj.fill);
            setDiameter('');
        } else if (obj.type === 'image') {
            setWidth(Math.round(obj.width * obj.scaleX));
            setHeight(Math.round(obj.height * obj.scaleY));
            setColor('');
            setDiameter('');
        } else if (obj.type === 'i-text') {
            setWidth(Math.round(obj.width * obj.scaleX));
            setHeight(Math.round(obj.height * obj.scaleY));
            setFontSize(obj.fontSize);
            setColor(obj.fill);
        }
    };

    const clearSettings = () => {
        setWidth('');
        setHeight('');
        setDiameter('');
        setColor('');
    };

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const numValue = parseFloat(value);

        setWidth(value);
        if (selectedObject && (selectedObject.type === 'rect' || selectedObject.type === 'triangle' || selectedObject.type === 'image' || selectedObject.type === 'i-text') && numValue >= 0) {
            selectedObject.set({
                width: numValue / selectedObject.scaleX
            });
            canvas.requestRenderAll();
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const numValue = parseFloat(value);

        setHeight(value);
        if (selectedObject && (selectedObject.type === 'rect' || selectedObject.type === 'triangle' || selectedObject.type === 'image' || selectedObject.type === 'i-text') && numValue >= 0) {
            selectedObject.set({
                height: numValue / selectedObject.scaleY
            });
            canvas.requestRenderAll();
        }
    };

    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const numValue = parseFloat(value);

        setDiameter(value);
        if (selectedObject && selectedObject.type === 'circle' && numValue >= 0) {
            const radius = numValue / 2 / selectedObject.scaleX;
            selectedObject.set({
                radius: radius
            });
            canvas.requestRenderAll();
        }
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
        if (selectedObject) {
            selectedObject.set({
                fill: value
            });
            canvas.requestRenderAll();
        }
    };

    const handleFontSizeChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const numValue = parseFloat(value);

        setFontSize(value);
        if (selectedObject && selectedObject.type === 'i-text' && numValue >= 0) {
            selectedObject.set({
                fontSize: numValue
            });
            canvas.requestRenderAll();
        }
    }

    return (
        <div className='Settings'>
            {selectedObject && selectedObject.type === 'rect' && (
                <>
                    <label>Width</label>
                    <input
                        fluid
                        value={width}
                        onChange={handleWidthChange}
                    />
                    <label>Height</label>
                    <input
                        fluid
                        value={height}
                        onChange={handleHeightChange}
                    />
                    <label>Color</label>
                    <input
                        fluid
                        type='color'
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
            {selectedObject && selectedObject.type === 'circle' && (
                <>
                    <label>Diameter</label>
                    <input
                        fluid
                        value={diameter}
                        onChange={handleDiameterChange}
                    />
                    <label>Color</label>
                    <input
                        fluid
                        type='color'
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
            {selectedObject && selectedObject.type === 'triangle' && (
                <>
                    <label>Width</label>
                    <input
                        fluid
                        value={width}
                        onChange={handleWidthChange}
                    />
                    <label>Height</label>
                    <input
                        fluid
                        value={height}
                        onChange={handleHeightChange}
                    />
                    <label>Color</label>
                    <input
                        fluid
                        type='color'
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
            {selectedObject && selectedObject.type === 'image' && (
                <>
                    <label>Width</label>
                    <input
                        fluid
                        value={width}
                        onChange={handleWidthChange}
                    />
                    <label>Height</label>
                    <input
                        fluid
                        value={height}
                        onChange={handleHeightChange}
                    />
                </>
            )}
            {selectedObject && selectedObject.type === 'i-text' && (
                <>
                    <label>Width</label>
                    <input
                        fluid
                        value={width}
                        onChange={handleWidthChange}
                    />
                    <label>Height</label>
                    <input
                        fluid
                        value={height}
                        onChange={handleHeightChange}
                    />
                    <label>FontSize</label>
                    <input
                        fluid
                        value={fontSize}
                        onChange={handleFontSizeChange}
                    />
                    <label>Color</label>
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
        </div>
    );
}

export default Settings;
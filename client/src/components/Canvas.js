import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { addItem, removeItem } from './Items';
import Settings from './Settings';
import { loadBackgroundImage, uploadImage } from './Image';
import '../css/Design.css';
import LayerList from './LayerList';

const Canva = ({ selectedProduct }) => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: 500,
                height: 500,
            });

            initCanvas.backgroundColor = '#fff';
            initCanvas.renderAll();

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current && selectedProduct.bg) {
            loadBackgroundImage(canvas, selectedProduct.bg);
        }
    }, [canvas, selectedProduct]);

    return (
        <div className='Canvas'>
            <div className='Toolbar'>
                <button className="tool-btn" onClick={() => addItem(canvas, 'rect')}>Sqaure</button>
                <button className="tool-btn" onClick={() => addItem(canvas, 'circle')}>Circle</button>
                <button className="tool-btn" onClick={() => addItem(canvas, 'triangle')}>Triangle</button>
                <input type="file" accept="image/*" className="tool-btn" onChange={file => uploadImage(canvas, file.target.files[0])}></input>
                <button className="tool-btn" onClick={() => addItem(canvas, 'text')}>Add Text</button>
                <button className="tool-btn" onClick={() => removeItem(canvas)}>Remove Item</button>
            </div>
            <canvas id='canvas' ref={canvasRef}></canvas>
            <Settings canvas={canvas} />
            <LayerList canvas={canvas} />
        </div>
    );
}

export default Canva;
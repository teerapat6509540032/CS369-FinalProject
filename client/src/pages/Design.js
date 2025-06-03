import React, { useState } from 'react';
import '../css/Design.css';
import Canvas from '../components/Canvas';

const TEMPLATES = [
  { label: 'T-Shirt', value: 'shirt', bg: '/mockups/shirt-template.png', price: 299 },
  { label: 'Mug', value: 'mug', bg: '/mockups/mug-template.png', price: 199 },
  { label: 'Phone Case', value: 'phonecase', bg: '/mockups/phonecase-template.png', price: 249 },
  { label: 'Bag', value: 'bag', bg: '/mockups/bag-template.png', price: 259 },
];

const Design = () => {
  const [selectedProduct, setSelectedProduct] = useState(TEMPLATES[0]);

  const handleSaveDesign = async () => {
    if (!selectedProduct.name) {
      alert('Please enter a design name');
      return;
    }

    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL({ format: 'png', quality: 1 });
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/design/createDesign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedProduct.name,
          image: dataURL.replace(/^data:image\/png;base64,/, ''),
          category: selectedProduct.value,
          price: selectedProduct.price,
        }),
      });
      if (res.ok) {
        alert('Design saved!');
      } else {
        alert('Failed to save design');
      }
    } catch (err) {
      alert('Error saving design');
    }
  }

  const handleAddToCart = async () => {
    if (!selectedProduct.name) {
      alert('Please enter a design name');
      return;
    }

    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL({ format: 'png', quality: 1 });
    const token = localStorage.getItem('token');
    try {
      // Save design first
      const res = await fetch('/api/design/createDesign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: selectedProduct.name,
          image: dataURL.replace(/^data:image\/png;base64,/, ''),
          category: selectedProduct.value,
          price: selectedProduct.price,
        }),
      });
      if (!res.ok) {
        alert('Failed to save design');
        return;
      }
      const designData = await res.json();
      // Add to cart
      const cartRes = await fetch('/api/cart/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: designData.productId,
          quantity: 1,
        }),
      });
      if (cartRes.ok) {
        alert('Design added to cart!');
      } else {
        alert('Failed to add design to cart');
      }
    }
    catch (err) {
      alert('Error adding design to cart');
    }
  }

  return (

    <div className="header-page">
      <h1>Design Your Product</h1>
      <p className="description">
        Start customizing your product with our easy-to-use design tools.
        Upload images, add text.
      </p>

      <div className="product-selector">
        <h3>Select Product Type</h3>
        <div className="product-options">
          <button
            className={`product-option ${selectedProduct.value === 'shirt' ? 'selected' : ''}`}
            onClick={() => setSelectedProduct(TEMPLATES[0])}
          >
            T-Shirt
          </button>
          <button
            className={`product-option ${selectedProduct.value === 'mug' ? 'selected' : ''}`}
            onClick={() => setSelectedProduct(TEMPLATES[1])}
          >
            Mug
          </button>
          <button
            className={`product-option ${selectedProduct.value === 'phonecase' ? 'selected' : ''}`}
            onClick={() => setSelectedProduct(TEMPLATES[2])}
          >
            Phone Case
          </button>
          <button
            className={`product-option ${selectedProduct.value === 'bag' ? 'selected' : ''}`}
            onClick={() => setSelectedProduct(TEMPLATES[3])}
          >
            Tote Bags
          </button>
        </div>
      </div>

      <div className="design-preview">
        <input className='design-name' type='text' placeholder='Design Name' value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
        <div className="mockup-area">
          <Canvas selectedProduct={selectedProduct} />
        </div>
        
      </div>

      <div className="design-complete">
        <button className="btn" onClick={handleSaveDesign}>Save design</button>
        <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>

  );
};

export default Design;

import React, { useState } from 'react';

const Design = () => {
  const [selectedProduct, setSelectedProduct] = useState('t-shirt');
  const [showPreview, setShowPreview] = useState(false);

  return (
    
      <div className="header-page">
        <h1>Design Your Product</h1>
        <p className="description">
          Start customizing your product with our easy-to-use design tools.
          Upload images, add text, and preview your creation in real time.
        </p>

        <div className="product-selector">
          <h3>Select Product Type</h3>
          <div className="product-options">
            <button 
              className={`product-option ${selectedProduct === 't-shirt' ? 'selected' : ''}`}
              onClick={() => setSelectedProduct('t-shirt')}>
              T-Shirt
            </button>
            <button 
              className={`product-option ${selectedProduct === 'mug' ? 'selected' : ''}`}
              onClick={() => setSelectedProduct('mug')}>
              Mug
            </button>
            <button 
              className={`product-option ${selectedProduct === 'phone-case' ? 'selected' : ''}`}
              onClick={() => setSelectedProduct('phone-case')}>
              Phone Case
            </button>
            <button 
              className={`product-option ${selectedProduct === 'tote-bags' ? 'selected' : ''}`}
              onClick={() => setSelectedProduct('tote-bags')}>
              Tote Bags
            </button>
          </div>
        </div>

        <div className="design-actions">
          <button className="btn btn-blue">Upload Image</button>
          <button className="btn btn-blue">Add Text</button>
          <button className="btn btn-outline-blue" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        <div className="design-preview">
          <div className="mockup-area">
            {showPreview ? (
              <div className="preview-content">
                <img 
                  src="" 
                  alt="Product Preview" 
                  className="product-image" 
                />
                <p className="preview-label">Preview of your {selectedProduct}</p>
              </div>
            ) : (
              <p>🖼️ your design and click "Show Preview" to see your product</p>
            )}
          </div>
        </div>

        <div className="design-complete">
          <button className="btn btn-blue">Add to Cart</button>
        </div>
      </div>
    
  );
};

export default Design;

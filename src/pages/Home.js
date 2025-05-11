import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero"> 
        <h1>Create Your Own Design</h1>
        <p>
          Transform your ideas into unique products. Design t-shirts, mugs, and
          more with just a few clicks.
        </p>
        <div className="hero-buttons">
          <Link to="/design"><button className="btn btn-white">Create Custom Design</button></Link>
          <button className="btn btn-outline">Learn More</button>
        </div>
      </section>

      <section className="features-section">
        <h2>Customize Your Products</h2>
        <div className="features-grid">
          <div className="feature-box">
            <img src="https://img.icons8.com/ios/50/image--v1.png" alt="Upload" />
            <h3>Upload Images</h3>
            <p>Add your photos, artwork, or designs easily</p>
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/ios/50/text.png" alt="Text" />
            <h3>Add Text</h3>
            <p>Customize with your own text and fonts</p>
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/ios/50/paint-palette.png" alt="Color" />
            <h3>Color Options</h3>
            <p>Choose from multiple color variations</p>
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/ios/50/search--v1.png" alt="Preview" />
            <h3>Preview</h3>
            <p>See your design in real-time</p>
          </div>
        </div>
      </section>

      <div class="products-section">
        <h2>Customize Your Products</h2>
        <div class="products-grid">
            <div class="product-card">
                <img src="https://cdn-icons-png.flaticon.com/128/863/863684.png" alt="T-Shirts" />
                <h3>T-Shirts</h3>
            </div>
            <div class="product-card">
                <img src="https://cdn-icons-png.flaticon.com/128/166/166805.png" alt="Mugs" />
                <h3>Mugs</h3>
            </div>
            <div class="product-card">
                <img src="https://cdn-icons-png.flaticon.com/128/644/644521.png" alt="Phone Cases" />
                <h3>Phone Cases</h3>
            </div>
            <div class="product-card">
                <img src="https://cdn-icons-png.flaticon.com/128/3301/3301039.png" alt="Tote Bags" />
                <h3>Tote Bags</h3>
            </div>
        </div>
    </div>

    </>
    
  );
};

export default Home;

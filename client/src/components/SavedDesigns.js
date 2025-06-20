import React, { useState, useEffect} from 'react';
import '../css/SavedDesigns.css';

const SavedDesigns = () => {
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        const fetchSavedDesigns = async () => {
            try {
                const response = await fetch('/api/design/getAllDesigns', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch saved designs');
                }
                const data = await response.json();
                setDesigns(data);
            } catch (error) {
                console.error('Error fetching saved designs:', error);
            }
        };
        fetchSavedDesigns();    
    }, []);

    const handleAddToCart = async (designId) => {
        try {
            const response = await fetch('/api/cart/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    productId: designId,
                    quantity: 1
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add design to cart');
            }
            alert('Design added to cart successfully!');
        } catch (error) {
            console.error('Error adding design to cart:', error);
        }
    }


    return (
        <div className="saved-designs-container">
            <h2>Saved Designs</h2>
            {designs.length > 0 ? (
                <div className="designs-grid">
                    {designs.map((design) => (
                        <div key={design.id} className="design-card">
                             <img src={design.designData} alt={design.name} className="design-image" />
                             <div className="design-info">
                                 <h3>{design.name}</h3>
                                 <button className="btn btn-blue" onClick={() => handleAddToCart(design.productId)}>addToCart</button>
                             </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No saved designs available.</p>
            )}
        </div>
    );
};

export default SavedDesigns;
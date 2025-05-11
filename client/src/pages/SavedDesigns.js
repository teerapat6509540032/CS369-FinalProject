import React from 'react';

const SavedDesigns = () => {
    const savedDesigns = [
        // Example data, replace with actual data or fetch from an API
        { id: 1, name: 'Design 1', description: 'This is design 1' },
        { id: 2, name: 'Design 2', description: 'This is design 2' },
        { id: 3, name: 'Design 3', description: 'This is design 3' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Saved Designs</h2>
            <br /> 
            {savedDesigns.length > 0 ? (
                <ul>
                    {savedDesigns.map((design) => (
                        <li key={design.id} style={{ marginBottom: '10px' }}>
                            <h2>{design.name}</h2>
                            <p>{design.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved designs available.</p>
            )}
        </div>
    );
};

export default SavedDesigns;
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

    // const savedDesigns = [
    //     { id: 1, name: 'Design 1', description: 'This is design 1', image: 'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
    //     { id: 2, name: 'Design 2', description: 'This is design 2', image: 'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
    //     { id: 3, name: 'Design 3', description: 'This is design 3', image: 'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D' },
    // ];

    return (
        <div className="saved-designs-container">
            <h2>Saved Designs</h2>
            {designs.length > 0 ? (
                <div className="designs-grid">
                    {designs.map((design) => (
                        <div key={design.id} className="design-card">
                            <div className="design-info">
                                <h3>{design.name}</h3>
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

// return (
//         <div className="saved-designs-container">
//             <h2>Saved Designs</h2>
//             {savedDesigns.length > 0 ? (
//                 <div className="designs-grid">
//                     {savedDesigns.map((design) => (
//                         <div key={design.id} className="design-card">
//                             <img src={design.image} alt={design.name} className="design-image" />
//                             <div className="design-info">
//                                 <h3>{design.name}</h3>
//                                 <p>{design.description}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No saved designs available.</p>
//             )}
//         </div>
//     );
// };

export default SavedDesigns;
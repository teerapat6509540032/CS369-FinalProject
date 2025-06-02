import React, { useState, useEffect } from 'react';
import '../css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
            const fetchCart = async () => {
                try {
                const response = await fetch('/api/cart/getCart', {
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

                const formattedItems = data.products.map(p => ({
                  id: p._id,
                  productId: p.product?.productId,
                  itemName: p.product?.name || "Unknown",
                  image: `/${p.product?.designData.replaceAll("\\", "/")}` || "", 
                  price: p.product?.price || 0,
                  quantity: p.quantity,
                  selected: false 
                }));
                setCartItems(formattedItems);
            } catch (error) {
                console.error('Error fetching saved designs:', error);
            }
        };
            fetchCart();    
        }, []);

  const handleIncrease = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems(prevItems =>
      prevItems.flatMap(item => {
        if (item.id === id) {
          if (item.quantity <= 1) {
            return[item];
          } else {
            return [{ ...item, quantity: item.quantity - 1 }];
          }
        }
        return [item];
      })
    );
  };

  const handleCheckboxChange = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  
  const handleDeleteItem = async (productId) => {
    const confirmDelete = window.confirm("Do you want to remove this item from the cart?");
    if (!confirmDelete) return;  

    try {
      const response = await fetch(`/api/cart/removeFromCart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
    
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };


  let totalCartPrice = 0;

  for (const item of cartItems) {
    const isSelected = item.selected;
    const pricePerItem = item.price;
    const quantity = item.quantity;
  
    if (isSelected) {
      const itemTotal = pricePerItem * quantity;
      totalCartPrice += itemTotal;
    }
  }



  return (
    <section className="item-section">
      {cartItems.map(item => (
        <div className="item-container" key={item.id}>
          <div className="item-checkbox">
            <input type="checkbox" className="addToCart" checked={item.selected}
              onChange={() => handleCheckboxChange(item.id)} />
          </div>
          <div className="item-image">
            <img src={item.image} alt="item-img" />
          </div>
          <div className="item-name">
            <span>{item.itemName}</span>
          </div>
          <div className="item-price">
            <span>฿{item.price}</span>
          </div>
          <div className="item-adjustAmount">
            <button type="button" onClick={() => handleDecrease(item.id)}>-</button>
            <input type="text" value={item.quantity} readOnly />
            <button type="button" onClick={() => handleIncrease(item.id)}>+</button>
          </div>
          <div className="summary-price">
            <span>฿{item.price * item.quantity}</span>
          </div>
          <div className="item-delete">
            <button 
              type="button" 
              onClick={() => handleDeleteItem(item.productId)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="checkout-cart">
        <span className='total-price'><b>Total : ฿{totalCartPrice}</b></span>
        <button>checkout</button>
      </div>
    </section>
  );
};

export default Cart;

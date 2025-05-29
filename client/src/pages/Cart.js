import React, { useState } from 'react';
import '../css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      itemName: 'T-shirt',
      price: 250,
      image: 'https://img.freepik.com/premium-vector/white-t-shirt-design-template_108964-91.jpg?w=360',
      quantity: 1
    },
    {
      id: 2,
      itemName: 'Hoodie',
      price: 450,
      image: 'https://cdn.psdrepo.com/images/2x/hoodie-free-mockup-premium-psd-j6.jpg',
      quantity: 1
    }
  ]);

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
            const confirmDelete = window.confirm("Do you want to remove this item from the cart?");
            if (confirmDelete) {
              return [];
            } else {
              return[item];
            }
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

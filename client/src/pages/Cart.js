// src/pages/Cart.js

import React from 'react';
import '../css/Cart.css';

const Cart = () => {
  return (
    <section className="item-section">
      <div className="item-container">
        <div className='item-checkbox'>
          <input type='checkbox'></input>
        </div>
        <div className='item-image'>
          <img src='https://img.freepik.com/premium-vector/white-t-shirt-design-template_108964-91.jpg?w=360' alt='item-img'/>
        </div>
        <div className='item-name'>
          <span>T-shirt</span>
        </div>
        <div className='item-price'>
          <span>฿599</span>
        </div>
        <div className='item-adjustAmount'>
          <button id='decrease' type='button'>-</button>
          <input type="text" value="1" id="input"/>
          <button id='increase' type='button'>+</button>
        </div>
        <div className='summary-price'>
          <span id="total-price">฿599</span>
        </div>
      </div>
    </section>
  );
};

export default Cart;

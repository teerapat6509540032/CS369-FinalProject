import React from 'react';
import { Link } from 'react-router-dom';

const Order = () => {
  return (
    
      <div className="header-page">
        <h1>Your Orders</h1>
        <p className="description">
          Review your recent orders and check their status. Track shipments and view order details.
        </p>

        <div className="order-actions">
          <Link to="/design"><button className="btn btn-blue">New Order</button></Link>
        </div>

        <div className="order-list">
          <div className="order-card">
            <div className="order-header">
              <h3>Order #12345</h3>
              <span className="order-date">April 2, 2025</span>
            </div>
            <div className="order-items">
              <p>Custom T-shirt - Blue, Size M</p>
              <p>Quantity: 1</p>
            </div>
            <div className="order-footer">
              <p>Status: <span className="status shipped">Shipped</span></p>
              <button className="btn btn-outline-blue">View Details</button>
            </div>
          </div>

          <div className="order-card">
            <div className="order-header">
              <h3>Order #12346</h3>
              <span className="order-date">March 28, 2025</span>
            </div>
            <div className="order-items">
              <p>Custom Mug - "Best Dad Ever"</p>
              <p>Quantity: 2</p>
            </div>
            <div className="order-footer">
              <p>Status: <span className="status processing">Processing</span></p>
              <button className="btn btn-outline-blue">View Details</button>
            </div>
          </div>

          <div className="order-card">
            <div className="order-header">
              <h3>Order #12344</h3>
              <span className="order-date">March 15, 2025</span>
            </div>
            <div className="order-items">
              <p>Custom Phone Case - Floral Design</p>
              <p>Quantity: 1</p>
            </div>
            <div className="order-footer">
              <p>Status: <span className="status delivered">Delivered</span></p>
              <button className="btn btn-outline-blue">View Details</button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Order;

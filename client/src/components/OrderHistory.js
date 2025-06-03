import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order/getOrderHistory', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = (orderId) => {
        try {
            window.location.href = `/order/${orderId}`;
        } catch (error) {
            console.error('Error navigating to order details:', error);
        }
    }
    if (orders.length > 0) {
        return (
            <div className="header-page">
                <h2>Your Orders History</h2>
                <div className="order-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order.orderID}</h3>
                                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="order-items">
                                {order.products.map((item, index) => (
                                    <p key={index}>{item.product.name} - Quantity: {item.quantity}</p>
                                ))}
                            </div>
                            <div className="order-footer">
                                <p>Status: <span className={`status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span></p>
                                <button className='btn btn-outline-blue' onClick={() => handleViewDetails(order.orderID)}>View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="header-page">
                <h2>Your Orders History</h2>
                <p>No orders found.</p>
            </div>
        );
    }

};

export default OrderHistory;

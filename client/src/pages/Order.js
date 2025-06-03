import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/Order.css'; 


const Order = () => {
  const [order, setOrder] = useState([]); 
  const { id: orderId } = useParams();

  console.log(orderId)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/getOrder/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch order');
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrder(data[0]); // เลือกตัวแรก
        } else {
          setOrder(data);    // ถ้าไม่ใช่ array ก็ใช้ตรง ๆ
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);


  return (
    <div className="header-page">
      <h1>Your Orders</h1>
      <p className="description">
        Review your recent orders and check their status.
      </p>

      <div className="order-actions">
        <Link to="/design"><button className="btn btn-blue">New Order</button></Link>
      </div>

      <div className="order-card">
        <div className="order-header">
          <h3>Order #{order.orderID}</h3>
          <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="order-items">
          
            {order.products?.map((item) => (
            <div key={item._id} className='item-card'>
              <p>{item.product?.name || "Unknown Product"}</p>
              {item.product?.designData && (
                <img
                  src={`/${item.product.designData.replaceAll("\\", "/")}`}
                  alt="item-img"
                  style={{ width: 100, height: 100 }}
                />
              )}
              <p>Price: ฿{item.product?.price || 0}</p>
              <p>Quantity: {item.quantity}</p>
              <p><strong>Total: ฿{(item.product?.price * item.quantity)}</strong></p>
            </div>)
          )}
        </div>

        <div className="order-summary">
          <h3>
            Grand Total: ฿
            {order.products?.reduce((sum, item) =>
              sum + (item.product?.price || 0) * item.quantity, 0).toLocaleString()}
          </h3>
        </div>

        <div className="order-footer">
          <p>Status: <span className={`status ${order.orderStatus?.toLowerCase?.()} || 'status'` }>{order.orderStatus}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Order;

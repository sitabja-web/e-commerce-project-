import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    // Payment service not configured - use bypass mode directly
    return bypassPayment();
  };

  const bypassPayment = async () => {
    console.log('Bypassing payment...', { user, cartItems, totalPrice });
    if (!user?.token) {
      toast.error('Not logged in. Please login first.');
      navigate('/login');
      return;
    }
    try {
      const saveOrderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId: 'bypass_txn_' + Date.now()
        })
      });
      const data = await saveOrderRes.json();
      console.log('Order response:', saveOrderRes.status, data);
      if (saveOrderRes.ok) {
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/ordersuccess');
      } else {
        toast.error('Order could not be placed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Network error: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please login first to continue checkout.');
      navigate('/login');
      return;
    }
    if (!user.token) {
      toast.error('Session expired. Please login again.');
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items first.');
      navigate('/shop');
      return;
    }
    if (!address.fullName || !address.street || !address.city || !address.postalCode || !address.country) {
      toast.error('Please fill in all address fields.');
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

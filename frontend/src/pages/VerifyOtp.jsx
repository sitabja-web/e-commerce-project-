import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const initialData = location.state || {};
  const [email, setEmail] = useState(initialData.email || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOtpAgain = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: initialData.name,
          email: email,
          password: initialData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'A new OTP has been sent.');
      } else {
        toast.error(data.message || 'Could not resend OTP.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while resending OTP.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Registration successful!');
        login(data);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 700);
      } else {
        toast.error(data.message || 'OTP verification failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while verifying your OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Verify OTP</h2>
        <p style={{ color: '#d4d4d8', margin: '-10px 0 0' }}>Enter the code sent to {email || 'your email'}</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength="6"
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify & Register'}
        </button>

        <button type="button" className="btn" onClick={requestOtpAgain} style={{ background: '#27272a', borderColor: '#3f3f46' }}>
          Resend OTP
        </button>

        <p>
          <Link to="/register">Back to registration</Link>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;

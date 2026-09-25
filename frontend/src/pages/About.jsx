import React from 'react';

const About = () => {
  const sectionStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0f 0%, #141419 50%, #0a0a0f 100%)',
    color: '#e4e4e7',
    padding: '80px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '60px'
  };

  const badgeStyle = {
    display: 'inline-block',
    background: 'rgba(249, 115, 22, 0.1)',
    color: '#f97316',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '20px',
    border: '1px solid rgba(249, 115, 22, 0.2)'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '16px',
    lineHeight: '1.2',
    background: 'linear-gradient(135deg, #fff 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#a1a1aa',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  };

  const cardStyle = {
    background: 'rgba(24, 24, 27, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '32px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default'
  };

  const iconStyle = {
    fontSize: '2.5rem',
    marginBottom: '16px'
  };

  const cardTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '12px'
  };

  const cardDescStyle = {
    color: '#a1a1aa',
    lineHeight: '1.7',
    fontSize: '1rem'
  };

  const ctaStyle = {
    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    color: '#fff',
    padding: '16px 40px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
    textDecoration: 'none',
    display: 'inline-block'
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '60px',
    paddingTop: '40px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#f97316',
    marginBottom: '8px'
  };

  const statLabelStyle = {
    color: '#a1a1aa',
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <span style={badgeStyle}>About ShopNest</span>
          <h1 style={titleStyle}>Building the Future of E-Commerce</h1>
          <p style={subtitleStyle}>
            ShopNest is a modern e-commerce platform designed to deliver exceptional shopping experiences
            with cutting-edge technology and user-centric design.
          </p>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={iconStyle}>🚀</div>
            <h3 style={cardTitleStyle}>Fast & Efficient</h3>
            <p style={cardDescStyle}>
              Built with performance in mind, our platform ensures lightning-fast load times
              and seamless navigation for every shopper.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={iconStyle}>🔒</div>
            <h3 style={cardTitleStyle}>Secure Payments</h3>
            <p style={cardDescStyle}>
              Your transactions are protected with industry-standard encryption and
              multiple payment options for your convenience.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={iconStyle}>🌍</div>
            <h3 style={cardTitleStyle}>Global Reach</h3>
            <p style={cardDescStyle}>
              Serving customers worldwide with reliable shipping and localized experiences
              tailored to your region.
            </p>
          </div>
        </div>

        <div style={statsStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={statNumberStyle}>10K+</div>
            <div style={statLabelStyle}>Happy Customers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={statNumberStyle}>500+</div>
            <div style={statLabelStyle}>Products</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={statNumberStyle}>24/7</div>
            <div style={statLabelStyle}>Support</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={statNumberStyle}>99%</div>
            <div style={statLabelStyle}>Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
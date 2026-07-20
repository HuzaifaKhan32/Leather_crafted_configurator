import React from 'react';

export default function Sidebar({ setActiveTab, activeTab }) {
  
  const sidebarStyles = {
    position: 'absolute',
    left: '10px',
    top: '70px',
    width: '70px',
    height: '250px',
    backdropFilter: 'blur(20px)',
    // background: '#d3cdca',
     background: 'rgba(150, 145, 145, 0.6)', 
    borderRadius: '70px',
    padding: '30px 10px',
   border: "1px solid rgba(255, 255, 255, 1)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    zIndex: 100
  };

  const iconContainerStyle = (tabName) => ({
    width: '60px',
    height: '60px',
    top: '30px',
    background: activeTab === tabName ? '#faf0ed' : '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  });

  const labelStyle = {
    color: '#333',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '5px'
  };

  return (
    <div style={sidebarStyles}>
      {/* Design Tab */}
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveTab(activeTab === 'Design' ? null : 'Design')}>
        <div style={iconContainerStyle('Design')}>
          <img src="/model/jacket.png" alt="Design" style={{ width: '33px' }} />
        </div>
        <p style={labelStyle}>Design</p>
      </div>

      {/* Color Tab */}
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveTab(activeTab === 'Color' ? null : 'Color')}>
        <div style={iconContainerStyle('Color')}>
          <img src="/model/color.png" alt="Color" style={{ width: '40px' }} />
        </div>
        <p style={labelStyle}>Color</p>
      </div>
    </div>
  );
}
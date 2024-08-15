// src/components/Header.js
import React from 'react'

const Header = ({cartCount}) => (
  <header
    style={{
      padding: '10px',
      backgroundColor: '#222',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <h1>Restaurant</h1>
    <div>
      <span>Cart ({cartCount})</span>
    </div>
  </header>
)

export default Header

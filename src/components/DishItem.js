// src/components/DishItem.js
import React, {useState} from 'react'

const DishItem = ({dish, updateCart}) => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
    updateCart(1)
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
      updateCart(-1)
    }
  }

  return (
    <div
      style={{
        margin: '10px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <h3>{dish.name}</h3>
      {dish.addoncat && <p>Customizations available</p>}
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default DishItem

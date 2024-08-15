// src/components/DishCategorySlider.js
import React from 'react'
import DishItem from './DishItem'

const DishCategorySlider = ({categories, updateCart}) => (
  <div style={{overflowX: 'scroll', whiteSpace: 'nowrap'}}>
    {categories.map(category => (
      <div
        key={category.name}
        style={{display: 'inline-block', width: '300px', verticalAlign: 'top'}}
      >
        <h2>{category.name}</h2>
        {category.dishes.map(dish => (
          <DishItem key={dish.id} dish={dish} updateCart={updateCart} />
        ))}
      </div>
    ))}
  </div>
)

export default DishCategorySlider

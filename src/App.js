// src/App.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  // State to store dish categories fetched from the API
  const [restaurantName, setRestaurantName] = useState('')
  const [menuCategories, setMenuCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryDishes, setCategoryDishes] = useState([])
  const [dishQuantities, setDishQuantities] = useState({})

  const dishesApiUrl =
    'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(dishesApiUrl)

        // Set the restaurant name
        const {restaurant_name, menu_category} = data
        setRestaurantName(restaurant_name)

        // Set the menu categories
        const categories = menu_category.map(({name}) => name)
        setMenuCategories(categories)

        // Handle initial category
        if (categories.length > 0) {
          setActiveCategory(categories[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (activeCategory) {
      const fetchCategoryDishes = async () => {
        try {
          const {data} = await axios.get(dishesApiUrl)

          const {menu_category} = data
          const categoryData = menu_category.find(
            ({name}) => name === activeCategory,
          )

          if (categoryData) {
            // Set the dishes for the active category
            setCategoryDishes(categoryData.dishes)

            // Initialize dish quantities
            const quantities = categoryData.dishes.reduce((acc, {id}) => {
              acc[id] = 0
              return acc
            }, {})
            setDishQuantities(quantities)
          }
        } catch (error) {
          console.error('Error fetching category dishes:', error)
        }
      }

      fetchCategoryDishes()
    }
  }, [activeCategory])

  // Function to handle menu category change
  const handleCategoryChange = category => {
    setActiveCategory(category)
  }

  // Function to handle dish quantity update
  const updateDishQuantity = (dishId, change) => {
    setDishQuantities(prevQuantities => ({
      ...prevQuantities,
      [dishId]: Math.max(0, (prevQuantities[dishId] || 0) + change),
    }))
  }

  return (
    <div>
      {/* Restaurant Name */}
      <header>
        <h1>{restaurantName || 'Loading...'}</h1>
        <p>My Orders</p>
      </header>

      {/* Menu Category Buttons */}
      <div id='table_menu_list'>
        {menuCategories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            style={{margin: '5px'}}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Dishes for Active Category */}
      {activeCategory === 'Salads and Soup' && (
        <div id='category_dishes'>
          {categoryDishes.map(
            ({
              id,
              dish_name,
              dish_currency,
              dish_price,
              dish_description,
              dish_calories,
              dish_image,
            }) => (
              <div key={id} style={{marginBottom: '20px'}}>
                <h2>{dish_name}</h2>
                <p>
                  {dish_currency} {dish_price}
                </p>
                <p>{dish_description}</p>
                <p>Calories: {dish_calories}</p>
                <img
                  src={dish_image}
                  alt={dish_name}
                  style={{maxWidth: '100px', maxHeight: '100px'}}
                />
                <div>
                  <button onClick={() => updateDishQuantity(id, -1)}>-</button>
                  <span>{dishQuantities[id] || 0}</span>
                  <button onClick={() => updateDishQuantity(id, 1)}>+</button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}

export default App

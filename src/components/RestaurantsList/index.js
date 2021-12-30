import RestaurantItem from '../RestaurantItem'
import './index.css'

const RestaurantsList = props => {
  const {restaurants} = props
  return (
    <ul className="restaurants-list-container">
      {restaurants.map(each => (
        <RestaurantItem restaurantDetails={each} key={each.id} />
      ))}
    </ul>
  )
}

export default RestaurantsList

import FoodItem from '../FoodItem'
import './index.css'

const FoodItemsList = props => {
  const {itemsList} = props

  return (
    <ul className="food-items-container">
      {itemsList.map(each => (
        <FoodItem itemDetails={each} key={each.id} />
      ))}
    </ul>
  )
}

export default FoodItemsList

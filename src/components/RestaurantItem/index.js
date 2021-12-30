import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = restaurantDetails
  const {rating, totalReviews} = userRating
  console.log(restaurantDetails)
  return (
    <li className="restaurant-list-item" testid="restaurant-item">
      <Link to={`restaurant/${id}`} className="restaurant-item-container">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-item-description-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-item-cuisine">{cuisine}</p>
          <div className="restaurant-item-rating-container">
            <AiFillStar className="restaurant-item-star" />
            <p className="restaurant-item-rating">{rating}</p>
            <p className="restaurant-item-total-reviews">
              ({totalReviews} ratings)
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem

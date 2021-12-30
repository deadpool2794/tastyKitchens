import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {pageStatusOptions} from '../../TastyKitchensUtils'
import Header from '../Header'
import CustomLoader from '../CustomLoader'
import FoodItemsList from '../FoodItemsList'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    bannerStatus: pageStatusOptions.loading,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.getBannerDetails()
  }

  getBannerDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const bannerDetailsUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const restaurantDetailsResponse = await fetch(bannerDetailsUrl, options)

    if (restaurantDetailsResponse.ok) {
      const parsedRestaurantDetails = await restaurantDetailsResponse.json()
      this.success(parsedRestaurantDetails)
    }
  }

  success = restaurantDetails => {
    const formattedRestaurantDetails = {
      costForTwo: restaurantDetails.cost_for_two,
      cuisine: restaurantDetails.cuisine,
      foodItems: restaurantDetails.food_items.map(each => ({
        name: each.name,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        rating: each.rating,
        cost: each.cost,
      })),
      id: restaurantDetails.id,
      imageUrl: restaurantDetails.image_url,
      itemsCount: restaurantDetails.items_count,
      location: restaurantDetails.location,
      name: restaurantDetails.name,
      opensAt: restaurantDetails.opens_at,
      rating: restaurantDetails.rating,
      reviewsCount: restaurantDetails.reviews_count,
    }
    this.setState({
      restaurantDetails: formattedRestaurantDetails,
      bannerStatus: pageStatusOptions.success,
    })
  }

  renderLoader = () => <CustomLoader testid="restaurant-details-loader" />

  renderSuccessView = () => {
    const {restaurantDetails} = this.state
    const {
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      imageUrl,
      foodItems,
    } = restaurantDetails
    return (
      <>
        <div className="restaurant-details-banner">
          <img
            className="restaurant-details-image"
            src={imageUrl}
            alt="restaurant"
          />
          <div className="restaurant-details-description-container">
            <h1 className="restaurant-details-banner-heading">{name}</h1>
            <p className="restaurant-details-banner-cuisine">{cuisine}</p>
            <p className="restaurant-details-banner-location">{location}</p>
            <div className="restaurant-details-rating-cost-container">
              <div className="restaurant-details-rating-container">
                <p className="restaurant-details-rating">
                  <AiFillStar /> {rating}
                </p>
                <p className="restaurant-details-reviews-count">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className="restaurant-details-cost-container">
                <p className="restaurant-details-cost">₹ {costForTwo}</p>
                <p className="restaurant-details-cost-for-two">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <FoodItemsList itemsList={foodItems} />
      </>
    )
  }

  renderRequiredForBanner = () => {
    const {bannerStatus} = this.state
    switch (bannerStatus) {
      case pageStatusOptions.loading:
        return this.renderLoader()
      case pageStatusOptions.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header selected="HOME" />
        {this.renderRequiredForBanner()}
      </>
    )
  }
}

export default RestaurantDetails

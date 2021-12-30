import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import 'slick-carousel/slick/slick.css'
import {pageStatusOptions} from '../../TastyKitchensUtils'
import Header from '../Header'
import CustomLoader from '../CustomLoader'
import RestaurantsList from '../RestaurantsList'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },

  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class Home extends Component {
  state = {
    offerSectionStatus: pageStatusOptions.loading,
    offersListImages: [],
    sortByOption: 'Lowest',
    restaurantsSectionStatus: pageStatusOptions.loading,
    pageNo: 1,
    searchInput: '',
    restaurantsList: [],
  }

  componentDidMount() {
    this.getOffersList()
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const limit = 9
    const {sortByOption, pageNo, searchInput} = this.state
    const offset = (pageNo - 1) * 9
    const restaurantsListApi = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortByOption}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const restaurantsListResponse = await fetch(restaurantsListApi, options)
    if (restaurantsListResponse.ok) {
      const parsedRestaurantsList = await restaurantsListResponse.json()
      this.successRestaurantsList(parsedRestaurantsList.restaurants)
    }
  }

  successRestaurantsList = restaurants => {
    const formattedRestaurantsList = restaurants.map(each => ({
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      groupByTime: each.groupByTime,
      hasOnlineDelivery: each.has_online_delivery,
      hasTableBooking: each.has_table_booking,
      id: each.id,
      imageUrl: each.image_url,
      isDeliveringNow: each.is_delivering_now,
      location: each.location,
      menuType: each.menu_type,
      name: each.name,
      opensAt: each.opens_at,
      userRating: {
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      },
    }))
    this.setState({
      restaurantsList: formattedRestaurantsList,
      restaurantsSectionStatus: pageStatusOptions.success,
    })
  }

  getOffersList = async () => {
    const offersListApi = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const offersListResponse = await fetch(offersListApi, options)
    if (offersListResponse.ok) {
      const parsedOffersList = await offersListResponse.json()
      this.successOffers(parsedOffersList.offers)
    }
  }

  successOffers = offers => {
    const formattedOffersList = offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))
    this.setState({
      offersListImages: formattedOffersList,
      offerSectionStatus: pageStatusOptions.success,
    })
  }

  renderLoader = testid => <CustomLoader testid={testid} />

  renderSuccessCarousel = () => {
    const {offersListImages} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    return (
      <Slider {...settings}>
        {offersListImages.map(each => (
          <div key={each.id}>
            <img src={each.imageUrl} alt="offer" className="carousel-image" />
          </div>
        ))}
      </Slider>
    )
  }

  renderSuccessRestaurantsList = () => {
    const {restaurantsList} = this.state
    return <RestaurantsList restaurants={restaurantsList} />
  }

  renderRequiredForRestaurantsList = () => {
    const {restaurantsSectionStatus} = this.state
    switch (restaurantsSectionStatus) {
      case pageStatusOptions.loading:
        return this.renderLoader('restaurants-list-loader')
      case pageStatusOptions.success:
        return this.renderSuccessRestaurantsList()
      default:
        return null
    }
  }

  renderRequiredForOffersCarousel = () => {
    const {offerSectionStatus} = this.state
    switch (offerSectionStatus) {
      case pageStatusOptions.loading:
        return this.renderLoader('restaurants-offers-loader')
      case pageStatusOptions.success:
        return this.renderSuccessCarousel()
      default:
        return null
    }
  }

  onChangeSort = event => {
    this.setState({sortByOption: event.target.value}, this.getRestaurantsList)
  }

  goToNextPage = () => {
    this.setState(prevState => {
      if (prevState.pageNo < 4) {
        return {
          pageNo: prevState.pageNo + 1,
          restaurantsSectionStatus: pageStatusOptions.loading,
        }
      }
      return {pageNo: prevState.pageNo}
    }, this.getRestaurantsList)
  }

  goToPreviousPage = () => {
    this.setState(prevState => {
      if (prevState.pageNo > 1) {
        return {
          pageNo: prevState.pageNo - 1,
          restaurantsSectionStatus: pageStatusOptions.loading,
        }
      }
      return {pageNo: prevState.pageNo}
    }, this.getRestaurantsList)
  }

  render() {
    const {pageNo} = this.state
    return (
      <>
        <Header selected="HOME" />
        <div className="home-container">
          {this.renderRequiredForOffersCarousel()}
          <div className="popular-restaurants-container">
            <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
            <div className="desc-and-sort">
              <p className="popular-restaurants-description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="sort-by-select">
                <MdSort className="sort-icon" />
                <p htmlFor="sortByOptions" className="sort-by">
                  Sort by
                </p>
                <select
                  id="sortByOptions"
                  className="sort-by"
                  onChange={this.onChangeSort}
                >
                  {sortByOptions.map(each => (
                    <option key={each.id} value={each.value}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {this.renderRequiredForRestaurantsList()}
          <div className="page-no-container">
            <button
              type="button"
              className="page-navigate-buttons"
              onClick={this.goToPreviousPage}
              testid="pagination-left-button"
            >
              <AiOutlineLeft className="home-page-navigate-icons" />
            </button>
            <p className="page-no-para">
              <span testid="active-page-number">{pageNo}</span> of 4.
            </p>
            <button
              type="button"
              className="page-navigate-buttons"
              onClick={this.goToNextPage}
              testid="pagination-right-button"
            >
              <AiOutlineRight className="home-page-navigate-icons" />
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home

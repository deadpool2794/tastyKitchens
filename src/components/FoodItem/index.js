import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {FiMinusSquare, FiPlusSquare} from 'react-icons/fi'
import {addToLocalStorage, decrementQuantity} from '../../TastyKitchensUtils'
import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  onClickAddToLocalStorage = () => {
    const {quantity} = this.state
    const {itemDetails} = this.props
    itemDetails.quantity = quantity + 1
    addToLocalStorage(itemDetails)
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickDecrementQuantity = () => {
    const {quantity} = this.state
    const {itemDetails} = this.props
    itemDetails.quantity = quantity - 1
    decrementQuantity(itemDetails)
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  renderAddButton = () => (
    <button
      type="button"
      className="food-item-add-button"
      onClick={this.onClickAddToLocalStorage}
    >
      Add
    </button>
  )

  renderButtons = () => {
    const {itemDetails} = this.props
    let {quantity} = itemDetails
    if (quantity === undefined) {
      quantity = 0
    }

    return (
      <div className="increment-decrement-container">
        <button
          type="button"
          className="food-item-buttons"
          onClick={this.onClickDecrementQuantity}
          testid="decrement-count"
        >
          <FiMinusSquare className="food-item-icon" />
        </button>
        <p className="food-item-quantity" testid="active-count">
          {quantity}
        </p>
        <button
          type="button"
          className="food-item-buttons"
          onClick={this.onClickAddToLocalStorage}
          testid="increment-count"
        >
          <FiPlusSquare className="food-item-icon" />
        </button>
      </div>
    )
  }

  renderRequired = () => {
    const {itemDetails} = this.props
    const {id} = itemDetails
    const cartData = localStorage.getItem('cartData')
    if (cartData === null) {
      return this.renderAddButton()
    }
    if (JSON.parse(cartData).find(each => each.id === id)) {
      return this.renderButtons()
    }
    return this.renderAddButton()
  }

  render() {
    const {itemDetails} = this.props

    const {imageUrl, name, cost, rating} = itemDetails
    return (
      <li className="food-item-list-container" testid="foodItem">
        <img src={imageUrl} alt="" className="food-item-image" />
        <div className="food-items-description-container">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">{cost}</p>
          <p className="food-item-star-and-rating">
            <AiFillStar className="food-item-star" /> {rating}
          </p>
          {this.renderRequired()}
        </div>
      </li>
    )
  }
}

export default FoodItem

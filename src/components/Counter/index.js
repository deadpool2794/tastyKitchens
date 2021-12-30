import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FiMinusSquare, FiPlusSquare} from 'react-icons/fi'
import {addToLocalStorage, decrementQuantity} from '../../TastyKitchensUtils'
import CustomLoader from '../CustomLoader'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Counter extends Component {
  state = {
    status: '',
    cartData: [],
  }

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData === null || cartData.length === 0) {
      this.setState({status: 'EMPTY'})
      return
    }
    this.setState({cartData, status: 'NOTEMPTY'})
  }

  renderNotEmptyView = () => {
    const {cartData} = this.state
    const total = cartData.reduce((a, b) => a + b.cost * b.quantity, 0)

    return (
      <>
        <ul className="cart-items-list">
          <div className="cart-item-sub-headings-container">
            <p className="cart-item-subheading item">Item</p>
            <p className="cart-item-subheading">Quantity</p>
            <p className="cart-item-subheading">Price</p>
          </div>
          {cartData.map(each => {
            const {imageUrl, name, quantity, cost} = each

            const onClickAddToLocalStorage = () => {
              const updatedFoodItemDetails = {...each, quantity: quantity + 1}
              const newCartData = addToLocalStorage(updatedFoodItemDetails)
              this.setState({cartData: newCartData})
            }

            const onClickRemoveFromLocalStorage = () => {
              const updatedFoodItemDetails = {...each, quantity: quantity - 1}
              const newCartData = decrementQuantity(updatedFoodItemDetails)
              if (newCartData.length === 0) {
                this.setState({cartData: newCartData, status: 'EMPTY'})
                return
              }
              this.setState({cartData: newCartData})
            }
            return (
              <li className="cart-list-item" key={each.id} testid="cartItem">
                <img src={imageUrl} alt="" className="cart-item-image" />
                <div className="cart-item-description">
                  <h1 className="cart-item-name">{name}</h1>
                  <div className="increment-decrement-container">
                    <button
                      type="button"
                      className="food-item-buttons"
                      onClick={onClickRemoveFromLocalStorage}
                      testid="decrement-quantity"
                    >
                      <FiMinusSquare className="food-item-icon" />
                    </button>
                    <p className="food-item-quantity" testid="item-quantity">
                      {quantity}
                    </p>
                    <button
                      type="button"
                      className="food-item-buttons"
                      onClick={onClickAddToLocalStorage}
                      testid="increment-quantity"
                    >
                      <FiPlusSquare className="food-item-icon" />
                    </button>
                  </div>
                  <p className="cart-item-cost">₹ {quantity * cost}.00</p>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="cart-total-container">
          <div className="order-and-amount">
            <h1 className="cart-item-order-heading">Order Total: </h1>
            <p className="cart-amount" testid="total-price">
              ₹ {total}.00
            </p>
          </div>
          <div className="cart-button-container">
            <button
              type="button"
              className="place-order-button"
              onClick={this.changeStatusToPaymentSuccessFull}
            >
              Place Order
            </button>
          </div>
        </div>
      </>
    )
  }

  changeStatusToPaymentSuccessFull = () => {
    this.setState({status: 'PAYMENTSUCCESS'})
  }

  renderEmptyView = () => (
    <div className="cart-empty-view">
      <div className="empty-cart-responsive-container">
        <img
          src="https://res.cloudinary.com/drobgtern/image/upload/v1640866203/cooking_1_rfuaov.png"
          alt="empty cart"
          className="empty-cart-image"
        />
        <h1 className="no-orders-yet">No Order Yet!</h1>
        <p className="empty-view-description">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="place-order-button">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  )

  renderPaymentSuccessView = () => (
    <div className="payment-successful-container">
      <img
        src="https://res.cloudinary.com/drobgtern/image/upload/v1640869545/Vector_1_med7kt.png"
        alt=""
        className="payment-successful-image"
      />
      <h1 className="payment-successful-heading">Payment Successful</h1>
      <p className="payment-successful-desc">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="place-order-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderRequired = () => {
    const {status} = this.state
    switch (status) {
      case 'NOTEMPTY':
        return this.renderNotEmptyView()
      case 'EMPTY':
        return this.renderEmptyView()
      case 'PAYMENTSUCCESS':
        return this.renderPaymentSuccessView()
      default:
        return <CustomLoader />
    }
  }

  render() {
    return (
      <>
        <Header selected="CART" />
        {this.renderRequired()}
        <Footer />
      </>
    )
  }
}

export default Counter

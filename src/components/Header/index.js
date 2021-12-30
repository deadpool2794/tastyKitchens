import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  alterShowMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {showMenu} = this.state
    const {selected} = this.props
    return (
      <>
        <nav className="header-nav-container">
          <div className="header-logo-name-container">
            <Link to="/" className="link-logo">
              <img
                src="https://res.cloudinary.com/drobgtern/image/upload/v1640768077/Vector_as4n2d.png"
                alt="website logo"
                className="header-logo"
              />
            </Link>
            <h1 className="header-website-name">Tasty Kitchens</h1>
          </div>
          <button
            type="button"
            className="header-button"
            onClick={this.alterShowMenu}
          >
            <GiHamburgerMenu className="header-icon" />
          </button>
          <div className="header-md-menu">
            <div className="menu-options">
              <Link to="/" className="header-link">
                <p
                  className={
                    selected === 'HOME'
                      ? 'header-option-name selected'
                      : 'header-option-name'
                  }
                >
                  Home
                </p>
              </Link>

              <Link to="/cart" className="header-link">
                <p
                  className={
                    selected === 'CART'
                      ? 'header-option-name selected'
                      : 'header-option-name'
                  }
                >
                  Cart
                </p>
              </Link>
              <button
                type="button"
                className="logout-button"
                onClick={this.logout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        {showMenu && (
          <div className="header-mobile-menu d-none">
            <div className="menu-options">
              <Link to="/" className="header-link">
                <p
                  className={
                    selected === 'HOME'
                      ? 'header-option-name selected'
                      : 'header-option-name'
                  }
                >
                  Home
                </p>
              </Link>

              <Link to="/cart" className="header-link">
                <p
                  className={
                    selected === 'CART'
                      ? 'header-option-name selected'
                      : 'header-option-name'
                  }
                >
                  Cart
                </p>
              </Link>
              <button
                type="button"
                className="logout-button"
                onClick={this.logout}
              >
                Logout
              </button>
            </div>
            <button
              type="button"
              className="header-button"
              onClick={this.alterShowMenu}
            >
              <AiFillCloseCircle className="header-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)

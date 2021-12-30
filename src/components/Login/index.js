import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    errorMsg: '',
    username: '',
    password: '',
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const body = JSON.stringify({
      username,
      password,
    })
    const options = {
      method: 'POST',
      body,
    }
    const loginResponse = await fetch(loginApiUrl, options)
    const parsedLoginResponse = await loginResponse.json()
    if (loginResponse.ok) {
      this.success(parsedLoginResponse.jwt_token)
    } else {
      this.failure(parsedLoginResponse.error_msg)
    }
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    history.replace('/')
  }

  failure = errorMsg => {
    this.setState({errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-page-top-section">
          <img
            className="login-page-image"
            src="https://res.cloudinary.com/drobgtern/image/upload/v1640756885/Rectangle_1457_bh3edt.png"
            alt=""
          />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onSubmitLoginForm}>
            <img
              src="https://res.cloudinary.com/drobgtern/image/upload/v1640758072/Frame_274_pikkdt.png"
              alt="website logo"
              className="tasty-kitchens-logo"
            />
            <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
            <h1 className="login-heading-2">Login</h1>
            <label htmlFor="usernameInput" className="login-page-labels">
              USERNAME
            </label>
            <input
              type="text"
              id="usernameInput"
              className="login-page-input-elements"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="passwordInput" className="login-page-labels">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordInput"
              className="login-page-input-elements"
              onChange={this.onChangePassword}
            />

            {errorMsg === '' ? (
              <p className="error-msg">{}</p>
            ) : (
              <p className="error-msg">*{errorMsg}</p>
            )}

            <button type="submit" className="login-page-button">
              Login
            </button>
          </form>
        </div>
        <div className="login-page-right-section">
          <img
            src="https://res.cloudinary.com/drobgtern/image/upload/v1640758180/Rectangle_1456_jj0loi.png"
            alt="website login"
            className="login-page-right-image"
          />
        </div>
      </div>
    )
  }
}

export default Login

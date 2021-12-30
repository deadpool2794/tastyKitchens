import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/drobgtern/image/upload/v1640867130/erroring_1_eazoyo.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found.Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="place-order-button ">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound

import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-responsive-container">
        <div className="footer-logo-and-name">
          <img
            src="https://res.cloudinary.com/drobgtern/image/upload/v1640789806/Vector_mpbtfc.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h1 className="footer-website-name">Tasty Kitchens</h1>
        </div>
        <p className="footer-description">
          The only thing we are serious about is food. Contact us on
        </p>
        <div className="social-icons-container">
          <FaPinterestSquare
            className="footer-icons"
            testid="pintrest-social-icon"
          />
          <FaInstagram
            className="footer-icons"
            testid="instagram-social-icon"
          />
          <FaTwitter className="footer-icons" testid="twitter-social-icon" />
          <FaFacebookSquare
            className="footer-icons"
            testid="facebook-social-icon"
          />
        </div>
      </div>
    </div>
  )
}

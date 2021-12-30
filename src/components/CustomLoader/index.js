import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const CustomLoader = props => {
  const {testid} = props
  return (
    <div className="loader-container" testid={testid}>
      <Loader type="TailSpin" color="#f7931e" height={40} width={40} />
    </div>
  )
}

export default CustomLoader

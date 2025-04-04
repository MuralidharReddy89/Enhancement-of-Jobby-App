import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProfileDetails extends Component {
  state = {
    profileData: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getProfiles()
  }

  getProfiles = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({apiStatus: apiConstantStatus.success, profileData})
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderLondingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-error-container">
      <button
        className="profile-button"
        data-testid="button"
        type="button"
        onClick={this.getProfiles}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt={name} className="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
    )
  }

  renderProfileData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.inProgress:
        return this.renderLondingView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileData()}</>
  }
}

export default ProfileDetails

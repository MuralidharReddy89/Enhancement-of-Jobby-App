import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobItem from '../SimilarJobItem'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobDetails: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getSimilarFormattedDtat = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachJob =>
        this.getSimilarFormattedDtat(eachJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobDetails: updatedSimilarJobsData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <div>
        <button
          className="failure-button"
          type="button"
          data-testid="button"
          onClick={this.getJobDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {jobData, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="main-container">
        <div className="job-card-details">
          <div className="campany-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-container">
              <h1>{title}</h1>
              <div className="rating">
                <FaStar />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="package-container">
            <div className="one">
              <div>
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div>
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div>
            <div className="description">
              <h1>Description</h1>
              <div>
                <a href={companyWebsiteUrl}>Visit</a>
                <BiLinkExternal />
              </div>
            </div>
            <p>{jobDescription}</p>
          </div>
          <div className="skill-container">
            <h1>Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => (
                <SkillCard key={eachSkill.name} skillsData={eachSkill} />
              ))}
            </ul>
          </div>
          <div className="life-company-container">
            <h1>Life at Company</h1>
            <div className="inner-life-at-campany">
              <p>{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-company-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-job-list">
            {similarJobDetails.map(job => (
              <SimilarJobItem key={job.id} similarJobData={job} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderAllJobDetailsItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAllJobDetailsItem()}
      </>
    )
  }
}

export default JobItemDetails

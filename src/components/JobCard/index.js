import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="text-container">
            <h1 className="title">{title}</h1>
            <div className="rating-conatiner">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="financial-container">
          <div className="location-container">
            <p>
              <MdLocationOn /> {location}
            </p>
            <p>
              <BsFillBriefcaseFill /> {employmentType}
            </p>
          </div>
          <h1>{packagePerAnnum}</h1>
        </div>
        <hr className="horizantal-line" />
        <h1>Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard

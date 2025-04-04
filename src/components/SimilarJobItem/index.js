import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobData} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = similarJobData

  return (
    <li>
      <div>
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1>Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="employmentType-location-container">
        <div className="location">
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div className="employmentType">
          <BsFillBriefcaseFill />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem

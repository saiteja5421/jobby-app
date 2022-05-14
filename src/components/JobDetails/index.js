import {Link} from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const JobDetails = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    title,
    rating,
    description,
    location,
    packagePerAnnum,
    id,
  } = job

  return (
    <li className="job-description">
      <Link to={`/jobs/${id}`} className="link">
        <div className="job-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating">
              <AiOutlineStar />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-employment">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <h1 className="description">Description</h1>
        <p className="description">{description}</p>
      </Link>
    </li>
  )
}
export default JobDetails

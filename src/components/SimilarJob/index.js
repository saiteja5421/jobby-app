import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const SimilarJob = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = job

  return (
    <li className="similar-list">
      <div className="job-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <hr className="hr" />
      <h1 className="description">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-container">
        <div className="location-employment">
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob

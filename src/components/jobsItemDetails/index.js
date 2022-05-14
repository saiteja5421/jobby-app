import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineStar} from 'react-icons/ai'
import SimilarJob from '../SimilarJob'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobItemDetailsList: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        CompanyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        lifeOfDescription: data.job_details.life_at_company.description,
        lifeOfImageUrl: data.job_details.life_at_company.image_url,
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }
      this.setState({
        jobItemDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobItemDetails()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobItemDetailsList} = this.state

    return (
      <div className="job-item-container">
        <div className="job-description">
          <div className="job-logo-container">
            <img
              src={jobItemDetailsList.CompanyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="title">{jobItemDetailsList.title}</h1>
              <div className="rating">
                <AiOutlineStar />
                <p>{jobItemDetailsList.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-container">
            <div className="location-employment">
              <p>{jobItemDetailsList.location}</p>
              <p>{jobItemDetailsList.employmentType}</p>
            </div>
            <p>{jobItemDetailsList.packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div className="description-container">
            <h1 className="description">Description</h1>
            <a href={jobItemDetailsList.companyWebsiteUrl} className="a">
              Visit
            </a>
          </div>
          <p className="description">{jobItemDetailsList.jobDescription}</p>
          <h1>Skills</h1>
          <ul className="ul">
            {jobItemDetailsList.skills.map(eachSkill => (
              <li className="li" key={eachSkill.name}>
                <img src={eachSkill.imageUrl} alt={eachSkill.name} />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <div>
            <h1>Life at Company</h1>
            <div className="life-at-company">
              <p>{jobItemDetailsList.lifeOfDescription}</p>
              <img
                src={jobItemDetailsList.lifeOfImageUrl}
                alt=" life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-title">Similar Jobs</h1>
        <ul className="similar-job">
          {jobItemDetailsList.similarJobs.map(eachJob => (
            <SimilarJob key={eachJob.id} job={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJob = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJob()}
      </div>
    )
  }
}
export default JobItemDetails

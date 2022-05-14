import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobDetails from '../JobDetails'
import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsDetails: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salary: '',
    profileDetails: [],
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const profile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profile,
        profileApiStatus: apiStatusConstants.success,
      })
      console.log(data)
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {searchInput, employmentType, salary} = this.state
    const employ = employmentType.join()
    console.log(employmentType)
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employ}&minimum_package=${salary}&search=${searchInput}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        description: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        jobsDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchInputJobs = () => {
    this.getJobsDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobsDetails()
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

  emptyJobs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1 className="head">No Jobs Found</h1>
      <p className="head">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccess = () => {
    const {jobsDetails} = this.state

    if (jobsDetails.length > 0) {
      return jobsDetails.map(eachJob => (
        <JobDetails key={eachJob.id} job={eachJob} />
      ))
    }
    return this.emptyJobs()
  }

  renderAll = () => {
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

  renderProfileLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  renderProfileFailure = () => (
    <div>
      <button type="button" onClick={this.onRetryProfile}>
        Retry
      </button>
    </div>
  )

  onchangeSalaryRange = event => {
    this.setState({salary: event}, this.getJobsDetails)
  }

  onChangeEmploymentType = event => {
    this.setState(
      prevState => ({employmentType: [...prevState.employmentType, event]}),
      this.getJobsDetails,
    )
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    return (
      <>
        <div className="profile-container">
          <img src={profileDetails.profileImageUrl} alt="profile" />
          <h1>{profileDetails.name}</h1>
          <p>{profileDetails.bio}</p>
        </div>
        <hr />
        <ul>
          <FilterGroup
            employmentType={employmentTypesList}
            onChangeEmploymentType={this.onChangeEmploymentType}
            salaryRange={salaryRangesList}
            onchangeSalaryRange={this.onchangeSalaryRange}
          />
        </ul>
      </>
    )
  }

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoading()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="job-details-container">{this.renderProfile()}</div>
          <div className="jobs">
            <div>
              <input
                type="search"
                value={searchInput}
                className="input"
                placeholder="search.."
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                onClick={this.searchInputJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul> {this.renderAll()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

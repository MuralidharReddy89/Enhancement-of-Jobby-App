import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import ProfileDetails from '../ProfileDetails'

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

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiConstantStatus.initial,
    jobsList: [],
    minimumSalary: 0,
    searchInput: '',
    employeeType: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const {employeeType, minimumSalary, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsList = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedJobsList,
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
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        onClick={this.getJobs}
        className="failure-button"
        data-testid="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    return jobsList.length > 0 ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-job-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-view"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderAllJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.inProgress:
        return this.renderLoadingView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchSubmit = event => {
    event.preventDefault()
    this.getJobs()
  }

  onChangeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobs)
  }

  changeEmployeeList = type => {
    this.setState(prevState => {
      const updatedEmployeeType = prevState.employeeType.includes(type)
        ? prevState.employeeType.filter(empType => empType !== type)
        : [...prevState.employeeType, type]

      return {employeeType: updatedEmployeeType}
    }, this.getJobs)
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <ProfileDetails />
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmployeeList={this.changeEmployeeList}
            onChangeSalary={this.onChangeSalary}
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            onSearchSubmit={this.onSearchSubmit}
          />
          <div>{this.renderAllJobsList()}</div>
        </div>
      </>
    )
  }
}

export default Jobs

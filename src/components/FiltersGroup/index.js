import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmployeeList,
    onChangeSalary,
    searchInput,
    changeSearchInput,
    onSearchSubmit,
  } = props

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onSearchSubmit()
    }
  }

  return (
    <div className="filters-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={changeSearchInput}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button
          type="button"
          className="search-button"
          onClick={onSearchSubmit}
          data-testid="searchButton"
        >
          <BsSearch />
        </button>
      </div>
      <hr className="line" />
      {/* Employment Type Filter */}
      <div className="employment-type-container">
        <h3 className="filter-heading">Employment Type</h3>
        <ul className="filters-list">
          {employmentTypesList.map(eachType => (
            <li key={eachType.employmentTypeId} className="filter-item">
              <input
                type="checkbox"
                id={eachType.employmentTypeId}
                value={eachType.employmentTypeId}
                onChange={() => changeEmployeeList(eachType.employmentTypeId)}
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="line" />
      {/* Salary Range Filter */}
      <div className="salary-range-container">
        <h3 className="filter-heading">Salary Range</h3>
        <ul className="filters-list">
          {salaryRangesList.map(eachSalary => (
            <li key={eachSalary.salaryRangeId} className="filter-item">
              <input
                type="radio"
                id={eachSalary.salaryRangeId}
                name="salaryRange"
                value={eachSalary.salaryRangeId}
                onChange={() => onChangeSalary(eachSalary.salaryRangeId)}
              />
              <label htmlFor={eachSalary.salaryRangeId}>
                {eachSalary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup

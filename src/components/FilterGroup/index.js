import './index.css'

const FilterGroup = props => {
  const renderEmploymentFilter = () => {
    const {employmentType, onChangeEmploymentType} = props

    const onChangeEmploymentTypeId = event => {
      onChangeEmploymentType(event.target.value)
    }

    return employmentType.map(each => (
      <li key={each.employmentTypeId}>
        <input
          id={each.label}
          type="checkbox"
          value={each.employmentTypeId}
          name="salary"
          onClick={onChangeEmploymentTypeId}
        />
        <label htmlFor={each.label} className="label">
          {each.label}
        </label>
      </li>
    ))
  }

  const renderSalaryFilter = () => {
    const {salaryRange, onchangeSalaryRange} = props

    const onChangeSalary = event => {
      onchangeSalaryRange(event.target.value)
    }
    return salaryRange.map(eachSalary => (
      <li key={eachSalary.salaryRangeId}>
        <input
          type="radio"
          value={eachSalary.salaryRangeId}
          id={eachSalary.salaryRangeId}
          name="salary"
          onClick={onChangeSalary}
        />
        <label htmlFor={eachSalary.salaryRangeId} className="label">
          {eachSalary.label}
        </label>
      </li>
    ))
  }
  return (
    <div>
      <div>
        <h1 className="label">Type of Employment</h1>
        <ul> {renderEmploymentFilter()}</ul>
      </div>
      <h1 className="label">Salary Range</h1>
      <ul> {renderSalaryFilter()}</ul>
    </div>
  )
}

export default FilterGroup

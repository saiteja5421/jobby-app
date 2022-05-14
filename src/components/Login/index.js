import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userInput: '', passwordInput: '', error: '', showErrorMsg: false}

  getErrorMessage = errorMsg => {
    this.setState({error: errorMsg, showErrorMsg: true})
  }

  getJwtToken = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userInput, passwordInput} = this.state

    const userDetails = {
      username: userInput,
      password: passwordInput,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.getJwtToken(data.jwt_token)
    } else {
      this.getErrorMessage(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {userInput, passwordInput, showErrorMsg, error} = this.state
    return (
      <div className="login-container">
        <form className="login-details-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="logo"
          />
          <label htmlFor="username" className="label-input">
            username
          </label>
          <input
            type="text"
            placeholder="username"
            id="username"
            className="input1"
            onChange={this.onChangeUsername}
            value={userInput}
          />
          <label htmlFor="password" className="label-input">
            password
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="input1"
            onChange={this.onChangePassword}
            value={passwordInput}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{error}</p>}
        </form>
      </div>
    )
  }
}
export default Login

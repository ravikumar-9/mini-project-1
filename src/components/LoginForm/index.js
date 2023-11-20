import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './loginForm.css'

const smallImageUrl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'
console.log(smallImageUrl)
const largeImageURl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'

console.log(largeImageURl)

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSSubmitFailure = errorMessage => {
    this.setState({showError: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const loginResponse = await fetch(url, options)

    const loginResponseData = await loginResponse.json()

    if (loginResponse.ok === true) {
      this.onSubmitSuccess(loginResponseData.jwt_token)
    } else {
      this.onSSubmitFailure(loginResponseData.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-form-container">
          <div className="login-form-card">
            <img
              src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
              alt="website logo"
              className="login-form-logo"
            />
            <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <div>
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  value={username}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div>
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showError ? <p className="error-msg">{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
          className="large-device-image"
          alt=""
        />
      </div>
    )
  }
}

export default LoginForm

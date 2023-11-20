import {Component} from 'react'

import './loginForm.css'

const smallImageUrl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'
console.log(smallImageUrl)
const largeImageURl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'

console.log(largeImageURl)

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  render() {
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
            <form className="login-form">
              <div>
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input type="text" id="username" className="input-field" />
              </div>
              <div>
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input type="password" id="password" className="input-field" />
              </div>
              <button type="button" className="login-button">
                Login
              </button>
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

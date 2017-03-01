import React from 'react';
import {hashHistory} from 'react-router';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Administrator",
      password: "Administrator",
      url: "/nuxeo"
    };
  }

  _handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  _directToDashboard() {
    hashHistory.push('/documents');
  }

  _submitForm(e){
    e.preventDefault();
    let callback = (user) => {
      this.props.setCurrentUser(user);
      this._directToDashboard();
    };
    this.props.getCurrentUser(this.state, callback);
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-buffer-box"></div>
          <div className="login-wrapper">
            <form className="login-form" onSubmit={this._submitForm.bind(this)}>
              <div >
                URL:
                <input className="login-input-field" type="text" value={this.state.url} onChange={this._handleChange("url")}/>
              </div>
              {/*<div>*/}
                {/*Username:*/}
                {/*<input type="text" value={this.state.username} onChange={this._handleChange("username")}/>*/}
              {/*</div>*/}
              {/*<div>*/}
                {/*Password:*/}
                {/*<input type="password" value={this.state.password} onChange={this._handleChange("password")}/>*/}
              {/*</div>*/}
              <input type="submit" value="Sign In" className="login-button"/>
            </form>
          </div>

      </div>
    );
  }

}

export default LogIn;

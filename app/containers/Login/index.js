/*
 *
 * Profile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectProfile from './selectors';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton, IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './login.css';

export class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loginSwitch: "Login",
      error: false,
      email: "",
      password: "",
      password2: "",
    };
  }

  googleLogin = (type) =>{
     return () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        }).then(() => {
          event.preventDefault(); // prevent full page reload
          // change current location without full page reload
          browserHistory.push(`/`);
        });
    }
  }

  pwReset = (type) =>{
  return () => {
    const email = this.state.email;
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
      console.log('email send out')
    }, function(error) {
      // An error happened.
      });
    }
  }

  handleSubmit = (type) => {
    return () => {
      const email = this.state.email;
      const pw = this.state.password;
      if (type === 'Login') {
        firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
          this.setState({ error: error.message });
        }).then(() => {
          browserHistory.push(`/`);
          });
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, pw).then(() => {
        }).catch((error) => this.setState({ error: error.message })).then(() => {
          browserHistory.push(`/`);
        });
      }
    }
  }

  render() {

    const socialLogin = <div className="socialAuth">
                          <button className="socialButton" onClick={this.googleLogin('google')}> Google </button>
                          <button className="socialButton" onClick={this.googleLogin('google')}> Github </button>
                          <button className="socialButton" onClick={this.googleLogin('google')}> Facebook </button>
                        </div>;

    const registerContent = <div> {socialLogin} <TextField placeholder='Email' onChanged={(value) => this.setState({email : value})} />
                                <TextField placeholder='Password' type={'password'} onChanged={(value) => this.setState({password : value})}/>
                                <TextField placeholder='Password' type={'password'} onChanged={(value) => this.setState({password2 : value})}/>
                                <button className="buttonsLogin"
                                  onClick={ this.handleSubmit("CreateUserAccount") }
                                > Create Account </button>
                         </div>;

    const loginContent = <div> {socialLogin} <TextField placeholder='Email' onChanged={(value) => this.setState({email : value})} />
                                <TextField placeholder='Password' type={'password'} onChanged={(value) => this.setState({password : value})}/>
                                <button className="buttonsLogin"
                                  onClick={ this.handleSubmit("Login") }
                                > login </button>
                                <button className="buttonsLogin"
                                  onClick={ this.pwReset("resett") }
                                >reset password</button>
                         </div>;

    const textMsg = this.state.loginSwitch == "Login" ? loginContent : registerContent;

    console.log(this.state.login);

    return (
    <div>
        <Helmet
          title="Profile"
          meta={[
            { name: 'description', content: 'Description of Profile' },
          ]}
        />
      <div className="mainContent container row" style={{margin: 'auto'}}>
        <Pivot onLinkClick={ (PivotItem) => this.setState({ loginSwitch : PivotItem.props.linkText })}>
          <PivotItem linkText='Login'   />
          <PivotItem linkText='Register'/>
        </Pivot>
        <div className="inputArea">
          <div className="inputInnerField">
            {textMsg}
          </div>
        </div>
     </div>
    </div>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

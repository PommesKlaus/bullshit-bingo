import React, { Component } from 'react';
import { } from 'react-router-dom';
import { FontIcon, RaisedButton } from "material-ui";
import { loginWithGoogle } from './googleAuth';
import { firebaseAuth, appTokenKey } from '../../constants';
import './Login.css';

const firebaseAuthKey = "firebaseAuthInProgress";

const LoadingScreen = () => (<p>Loading...</p>)

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin() {
    loginWithGoogle()
        .catch(function (error) {
            alert(error); // or show toast
            localStorage.removeItem(firebaseAuthKey);
        });
    localStorage.setItem(firebaseAuthKey, "1");
  }

  componentWillMount() {
    if (localStorage.getItem(appTokenKey)) {
      this.props.history.push('/')
      return;
    }

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
          //console.log("User signed in: ", JSON.stringify(user));

          localStorage.removeItem(firebaseAuthKey);

          // here you could authenticate with you web server to get the
          // application specific token so that you do not have to
          // authenticate with firebase every time a user logs in
          localStorage.setItem(appTokenKey, user.uid);

          // store the token
          console.log(this.props);
          const redirectTo = this.props.location.state || '/';
          this.props.history.push(redirectTo)
      }
    });

  }

  render() {
    if (localStorage.getItem(firebaseAuthKey) === "1") return <LoadingScreen />;
    return (
      <div>
        <h1>Anmelden</h1>
        <RaisedButton
            label="Sign in with Google"
            labelColor={"#ffffff"}
            backgroundColor="#dd4b39"
            icon={<FontIcon className="fa fa-google-plus" style={{color: '#ffffff'}}/>}
            onClick={this.handleGoogleLogin}
        />
      </div>      
    )
  }
}

export default Login

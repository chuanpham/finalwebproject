import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { socialLogin, authenticate } from '../auth';

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    responseGoogle = response => {
        const tokenId = response.tokenId;
        const user = {
            tokenId: tokenId
        };

        socialLogin(user).then(data => {
            
            if (data.error) {
                console.log('Error Login. Please try again..');
            } else {
                //if login successfully, set redirectToReferrer to true
                authenticate(data, () => {
                    console.log('social login response from api', data);
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        // redirect to homepage
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }

        return (
            <GoogleLogin
                clientId="901109159992-hql43eakd287b0dpj8pr3k2jcnmv29pt.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}

export default SocialLogin;

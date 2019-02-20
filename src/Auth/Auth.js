import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: '<YOUR_AUTH0_DOMAIN>',
      audience: 'https://<YOUR_AUTH0_DOMAIN>/userinfo',
      clientID: '<YOUR_AUTH0_CLIENT_ID>',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return {
      name: 'Tooraj Helmi'
    };
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    //mocking for now
    //return new Date().getTime() < this.expiresAt;

    return true;
  }

  signIn() {
    //mocking for now
    //this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        //Mocking for now
        // if (err) return reject(err);
        // if (!authResult || !authResult.idToken) {
        //   return reject(err);
        // }
        // this.idToken = authResult.idToken;
        // this.profile = authResult.idTokenPayload;
        // // set the time that the id token will expire at
        // this.expiresAt = authResult.idTokenPayload.exp * 1000;

        this.idToken = "DevToken";
        this.profile = {
            name: 'Tooraj Helmi'
        };
        // set the time that the id token will expire at
        //this.expiresAt = authResult.idTokenPayload.exp * 1000;
        this.expiresAt = 30953792012500
        resolve();
      });
    })
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const Auth0Client = new Auth();

export default Auth0Client;
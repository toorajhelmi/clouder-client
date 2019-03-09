import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-ag-se-jz.auth0.com',
      audience: 'https://dev-ag-se-jz.auth0.com/userinfo',
      clientID: 'lZFtMhemfRwWMQvNjM2rG3NpxODY1DSX',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return {
      name: 'Tooraj Helmi',
      id: 'thelmi'
    };
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    //return true;
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;

        // this.idToken = "DevToken";
        // this.profile = {
        //     name: 'Tooraj Helmi'
        // };
        //this.expiresAt = 30953792012500

        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
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
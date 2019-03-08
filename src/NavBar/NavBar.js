import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth/Auth';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      factory: null
    }
  }

  componentDidMount() {
    this.props.setCurrentFactoryCommand.execute = factory => {
      this.setState({ factory: factory });
    }
  }

  componentWillUnmount() {
    this.props.setCurrentFactoryCommand.execute = null;
  }

  render() {
    const signOut = () => {
      auth0Client.signOut();
      this.props.history.replace('/');
    };

    if (auth0Client.isAuthenticated()) {
      this.props.updateCurrentUser(auth0Client.getProfile());
    }
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary fixed-top">
          <Link className="navbar-brand" to="/" onClick={e => this.setState({factory: null})}>
            Clouder / All Factories
          </Link>
          {
            this.state.factory &&
            <button className="btn btn-warning">{this.state.factory.name}</button>
          }
          {
            !auth0Client.isAuthenticated() &&
            <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
              <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
              <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
            </div>
          }
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
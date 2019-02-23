import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Factories from './Factories/Factories';
import Factory from './Factory/Factory';
import Callback from './Auth/callback';
import NewFactory from './NewFactory/NewFactory';
import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component {
  render() {
    return (
      <div className="content">
        <NavBar />
        <Route exact path='/' component={Factories} />
        <Route exact path='/factory/:id' component={Factory} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-factory' component={NewFactory} />
      </div>
    );
  }
}

export default App;

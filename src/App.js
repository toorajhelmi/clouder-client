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
  constructor() {
    super();

    this.updateCurrentFactory = this.updateCurrentFactory.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  currentUser = null;
  currentFactory = null;

  setCurrentFactoryCommand = {
    execute: null
  }

  //        <Route exact path='/factory' component={Factory}/>
  render() {
    return (
      <div className="content" id="app">
        <NavBar updateCurrentUser={this.updateCurrentUser}
          setCurrentFactoryCommand ={this.setCurrentFactoryCommand}/>
        <Route exact path='/' component={Factories} />
        <Route exact path={'/factory'} component={() => 
          <Factory user={this.currentUser} updateCurrentFactory={this.updateCurrentFactory}/>}
        />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-factory' component={() => <NewFactory />}
        />
      </div>
    );
  }

  updateCurrentFactory(factory) {
      this.currentFactory = factory;
      this.setCurrentFactoryCommand.execute(factory);
  }

  updateCurrentUser(user) {
      this.currentUser = user;
  }
}

export default App;

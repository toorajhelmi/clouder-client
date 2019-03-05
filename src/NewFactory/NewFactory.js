import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth/Auth';
import axios from 'axios';

class NewFactory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      name: '',
      description: '',
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Factory</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => { this.setState({ name: e.target.value }) }}
                    className="form-control"
                    placeholder="Give your factory a name."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => { this.setState({ description: e.target.value }) }}
                    className="form-control"
                    placeholder="Give more context about the factory."
                  />
                </div>
                <button
                  disabled={this.state.disabled || !this.state.name || !this.state.description}
                  className="btn btn-primary"
                  onClick={() => { this.submit() }}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    axios.post('http://localhost:7071/api/Factory_Add', {
      name: this.state.name,
      description: this.state.description}, {
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    }).then(response =>
      this.props.history.push({
        pathname: '/factory',
        state: { factory: response.data }
      }));
  }
}

export default withRouter(NewFactory);
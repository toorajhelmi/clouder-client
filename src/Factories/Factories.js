import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Factories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      factories: null,
    };
  }

  async componentDidMount() {
    const factories = (await axios.get('http://localhost:7071/api/User_Get')).data;
    this.setState({
      factories,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-factory">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Try adding a new factory ...</div>
              <div className="card-body">
                <h4 className="card-title">+ New Factory</h4>
              </div>
            </div>
          </Link>
          {
            this.state.factories === null && <p>Loading factories...</p>}
          {
            this.state.factories && this.state.factories.map(factory => (
              <div key={factory.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/factory?id=${factory.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">{factory.name}</div>
                    <div className="card-body">
                      <p className="card-text">{factory.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Factories;
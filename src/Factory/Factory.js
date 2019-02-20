import React, {Component} from 'react';
import axios from 'axios';

class Factory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factory: null
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    var url = `http://localhost:7071/api/Factory_Get?id=${params.id}`;
    const factory = (await axios.get(url)).data;
    this.setState({
      factory
    });
  }

  render() {
    const {factory} = this.state;
    if (factory === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{factory.name}</h1>
            <p className="lead">{factory.description}</p>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    )
  }
}

export default Factory;

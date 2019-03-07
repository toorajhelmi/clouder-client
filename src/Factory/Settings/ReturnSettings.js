import React, { Component } from 'react';
import ReturnInstructions from './ReturnInstructions'

export default class ReturnSettings extends Component {
    constructor() {
        super();
        this.state = {
            expression: ''
        }

        this.updateExpression = this.updateExpression.bind(this);
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        return (
            <div>
                <div className="card bg-info mb-3" style={{ border: "none" }}>
                    <div className="card-header" style={{ color: "white" }}>Return Settings</div>
                    <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <label>Expression:</label>
                            <textarea
                                className="form-control z-depth-1"
                                rows="10"
                                placeholder="e.g: x - 2"
                                value={this.state.expression}
                                onChange={e => { this.updateExpression(e.target.value) }}
                            />
                        </div>
                        <div style={{ backgroundColor: "#ffd400", padding: "10px" }}>
                            <ReturnInstructions />
                        </div>
                    </div>
                </div> 
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ expression: settings.has('expression') ? settings.get('expression') : '' });
    }

    updateExpression(newValue) {
        this.setState({ expression: newValue });
        this.props.settings.set('expression', newValue);
    }
}
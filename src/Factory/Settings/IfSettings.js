import React, { Component } from 'react';
import ConditionInstructions from './ConditionInstructions'

export default class IfSettings extends Component {
    constructor() {
        super();
        this.state = {
            condition: ''
        }

        this.updateCondition = this.updateCondition.bind(this);
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        return (
            <div>
                <div className="card bg-info mb-3" style={{ border: "none" }}>
                    <div className="card-header" style={{ color: "white" }}>Condition Settings</div>
                    <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <label>Condition:</label>
                            <textarea
                                className="form-control z-depth-1"
                                rows="10"
                                placeholder="e.g: (x > y || !z)"
                                value={this.state.condition}
                                onChange={e => { this.updateCondition(e.target.value) }}
                            />
                        </div>
                        <div style={{ backgroundColor: "#ffd400", padding: "10px" }}>
                            <ConditionInstructions />
                        </div>
                    </div>
                </div> 
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ condition: settings.has('condition') ? settings.get('condition') : '' });
    }

    updateCondition(newValue) {
        this.setState({ condition: newValue });
        this.props.settings.set('condition', newValue);
    }
}
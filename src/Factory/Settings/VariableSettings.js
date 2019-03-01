import React, { Component } from 'react';
import VariableInstructions from './VariableInstructions'

export default class VariableSettings extends Component {
    constructor() {
        super();
        this.state = {
            variableName: '',
            definition: ''
        }

        this.updateDefinition = this.updateDefinition.bind(this);
        this.updateVariableName = this.updateVariableName.bind(this);
        
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        return (
            <div>
                <div className="card bg-info mb-3" style={{ border: "none" }}>
                    <div className="card-header" style={{ color: "white" }}>Variable Settings</div>
                    <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <label>Variable Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Give variable a name."
                                value={this.state.variableName}
                                onChange={e => { this.updateVariableName(e.target.value) }}/>
                        </div>
                        <div className="form-group">
                            <label>Definition:</label>
                            <textarea
                                className="form-control z-depth-1"
                                rows="10"
                                placeholder="e.g: (x > y || !z)"
                                value={this.state.definition}
                                onChange={e => { this.updateDefinition(e.target.value) }}
                            />
                        </div>
                        <div style={{ backgroundColor: "#ffd400", padding: "10px" }}>
                            <VariableInstructions />
                        </div>
                    </div>
                </div> 
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ definition: settings.has('definition') ? settings.get('definition') : '' });
        this.setState({ variableName: settings.has('variableName') ? settings.get('variableName') : '' });
    }

    updateDefinition(newValue) {
        this.setState({ definition: newValue });
        this.props.settings.set('definition', newValue);
    }

    updateVariableName(newValue) {
        this.setState({ variableName: newValue });
        this.props.settings.set('variableName', newValue);
    }
}
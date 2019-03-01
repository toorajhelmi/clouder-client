import React, { Component } from 'react';

export default class IterateSettings extends Component {
    constructor() {
        super();
        this.state = {
            listName: '',
            variableName: '',
        }

        this.refreshState = this.refreshState.bind(this);
        this.updateListName = this.updateListName.bind(this);
        this.updateVariableName = this.updateVariableName.bind(this);
    }

    listWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        return (
            <div className="card bg-info mb-3" style={{ border: "none" }}>
                <div className="card-header" style={{ color: "white" }}>Iteration Settings</div>
                <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                    <div className="form-group">
                        <label>List Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give list a name."
                            value={this.state.listName}
                            onChange={e => { this.updateListName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Iteration Variable Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give iteration variable a name."
                            value={this.state.variableName}
                            onChange={e => { this.updateVariableName(e.target.value) }}
                        />
                    </div>
                </div>
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ listName: settings.has('listName') ? settings.get('listName') : '' });
        this.setState({ variableName: settings.has('variableName') ? settings.get('variableName') : '' });
    }

    updateListName(newValue) {
        this.setState({ listName: newValue });
        this.props.settings.set('listName', newValue);
    }

    updateVariableName(newValue) {
        this.setState({ variableName: newValue });
        this.props.settings.set('variableName', newValue);
    }
}
import React, { Component } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export default class QueueTriggerSettings extends Component {
    constructor() {
        super();
        this.state = {
            componentName: '',
            functionName: '',
            inputName: '',
            size: '',
        }

        this.refreshState = this.refreshState.bind(this);
        this.updateComponentName = this.updateComponentName.bind(this);
        this.updateFunctionName = this.updateFunctionName.bind(this);
        this.updateInputName = this.updateInputName.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    sizes = ['','Free', 'Small', 'Medium', 'Large'];

    render() {
        return (
            <div className="card bg-info mb-3" style={{ border: "none" }}>
                <div className="card-header" style={{ color: "white" }}>Queue Trigger Settings</div>
                <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                    <div className="form-group">
                        <label>Component Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give component a name."
                            value={this.state.componentName}
                            onChange={e => { this.updateComponentName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Function Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give function a name."
                            value={this.state.functionName}
                            onChange={e => { this.updateFunctionName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Input Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give input a name."
                            value={this.state.inputName}
                            onChange={e => { this.updateInputName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Size:</label>
                        <DropDownListComponent
                            dataSource={this.sizes}
                            placeholder="Select a size."
                            value={this.state.size}
                            change={e => { this.updateSize(e.value) }} />
                    </div>
                </div>
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ componentName: settings.has('componentName') ? settings.get('componentName') : '' });
        this.setState({ functionName: settings.has('functionName') ? settings.get('functionName') : '' });
        this.setState({ inputName: settings.has('inputName') ? settings.get('inputName') : '' });
        this.setState({ size: settings.has('size') ? settings.get('size') : '' });
    }

    updateComponentName(newValue) {
        this.setState({ componentName: newValue });
        this.props.settings.set('componentName', newValue);
    }

    updateFunctionName(newValue) {
        this.setState({ functionName: newValue });
        this.props.settings.set('functionName', newValue);
    }

    updateInputName(newValue) {
        this.setState({ inputName: newValue });
        this.props.settings.set('inputName', newValue);
    }

    updateSize(newValue) {
        this.setState({ size: newValue });
        this.props.settings.set('size', newValue);
    }
}
import React, { Component } from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import CodeInstructions from './CodeInstructions'

export default class CodeSettings extends Component {
    constructor() {
        super();
        this.state = {
            componentName: '',
            methodName: '',
            inputVariables: '',
            hasOutput: true,
            outputName: '',
            code: '', tempCode: '',
            showEditor: false
        }

        this.updateMethodName = this.updateMethodName.bind(this);
        this.updateInputVariables = this.updateInputVariables.bind(this);
        this.updateOutputName = this.updateOutputName.bind(this);
        this.updateHasOutput = this.updateHasOutput.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.cancelEditor = this.cancelEditor.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        var outputSelection = null;
        if (this.state.hasOutput) {
            outputSelection =
                <div className="form-group">
                    <label>Output Variable Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Give output a name."
                        value={this.state.outputName}
                        onChange={e => { this.updateOutputName(e.target.value) }} />
                </div>
        }
        return (
            <div>
                <div className="card bg-info mb-3" style={{ border: "none" }}>
                    <div className="card-header" style={{ color: "white" }}>Code Settings</div>
                    <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <div className="form-group">
                                <label>Method Name:</label>
                                <input
                                    type="text"
                                    onChange={e => { this.methodName(e.target.value) }}
                                    className="form-control"
                                    placeholder="Give method a name."
                                    value={this.state.methodName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Input Variable Names:</label>
                                <input
                                    type="text"
                                    onChange={e => { this.updateInputVariables(e.target.value) }}
                                    className="form-control"
                                    placeholder="x, y, ..."
                                    value={this.state.inputVariables}
                                />
                            </div>
                            <div className="form-group">
                                <CheckBoxComponent
                                    label="Has return value"
                                    change={e => { this.updateHasOutput(e.checked) }}
                                    checked={this.state.hasOutput}
                                    className="form-control" />
                            </div>
                            {outputSelection}
                        </div>
                        <div className="form-group">
                            <button className='e-control e-btn e-info' onClick={this.showEditor}>Define Method</button>
                        </div>
                    </div>
                </div>
                <SidebarComponent isOpen={this.state.showEditor} type="Over" width="100%" position="Right" target="diagram" showBackdrop="false">
                    <div className="center-align">
                        <div className="container">
                            <div className="row">
                                <div className="col-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                    <div className="card bg-info mb-3" style={{ border: "none" }}>
                                        <div className="card-header" style={{ color: "white" }}>Method Definition</div>
                                        <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                                            <div className="form-group">
                                                {/* Todo: enable code mirror */}
                                                <textarea
                                                    className="form-control z-depth-1"
                                                    rows="20"
                                                    placeholder="Type your code here"
                                                    value={this.state.tempCode}
                                                    onChange={e => { this.setState({ tempCode: e.target.value }) }} />
                                            </div>
                                            <div magin="auto">
                                                <ButtonComponent className="col-5 offset-1" style={{ marginRight: "15px" }} cssClass='e-success' onClick={this.saveEditor}>SAVE</ButtonComponent>
                                                <ButtonComponent className="col-5" cssClass='e-danger' onClick={this.cancelEditor}>CANCEL</ButtonComponent>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ backgroundColor: "#ffd400", padding: "10px" }}>
                                <CodeInstructions />
                            </div>
                        </div>
                    </div>
                </SidebarComponent>
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ methodName: settings.has('methodName') ? settings.get('methodName') : '' });
        this.setState({ inputVariables: settings.has('inputVariables') ? settings.get('inputVariables') : '' });
        this.setState({ code: settings.has('code') ? settings.get('code') : '' });
        this.setState({ outputName: settings.has('outputName') ? settings.get('outputName') : '' });
        this.setState({ hasOutput: settings.has('hasOutput') ? settings.get('hasOutput') : '' });
    }

    updateMethodName(newValue) {
        this.setState({ methodName: newValue });
        this.props.settings.set('methodName', newValue);
    }

    updateOutputName(newValue) {
        this.setState({ outputName: newValue });
        this.props.settings.set('outputName', newValue);
    }

    updateInputVariables(newValue) {
        this.setState({ inputVariables: newValue });
        this.props.settings.set('inputVariables', newValue);
    }

    updateHasOutput(newValue) {
        this.setState({ hasOutput: newValue });
        this.props.settings.set('hasOutput', newValue);
    }

    updateSize(newValue) {
        this.setState({ size: newValue });
        this.props.settings.set('size', newValue);
    }

    showEditor() {
        this.setState({ showEditor: true });
        this.props.expand();
    }

    cancelEditor() {
        this.setState({ tempCode: this.state.code });
        this.setState({ showEditor: false });
        this.props.unexpand();
    }

    saveEditor() {
        this.setState({ code: this.state.tempcode });
        this.setState({ showEditor: false });
        this.props.settings.set('code', this.state.code); 
        this.props.unexpand();
    }
}
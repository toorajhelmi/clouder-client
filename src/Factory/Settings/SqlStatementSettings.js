import React, { Component } from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import StatementInstructions from './StatementInstructions'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export default class SqlStatementSettings extends Component {
    constructor() {
        super();
        this.state = {
            dbScript: '', tempDbScript: '',
            statementType: '',
            returnType: '',
            outputName: '',
            showEditor: false
        }

        this.updateStatementType = this.updateStatementType.bind(this);
        this.updateReturnType = this.updateReturnType.bind(this);
        this.updateOutputName = this.updateOutputName.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.cancelEditor = this.cancelEditor.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
    }

    statementTypes = ['', 'Select', 'Insert', 'Update', 'Delete'];
    returnTypes = ['', 'Singular', 'Entity', 'Array'];

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        var returnSelection = null;
        if (this.state.statementType === "Select") {
            returnSelection =
                <div className="form-group">
                    <label>Return Type:</label>
                    <DropDownListComponent
                        dataSource={this.returnTypes}
                        placeholder="Select a return type."
                        value={this.state.returnType}
                        change={e => { this.updateReturnType(e.value) }}
                        disabled={this.state.statementType !== 'Select'} />
                </div>
        }
        var outputSelection = null;
        if (this.state.statementType === "Select" || this.state.statementType === "Insert") {
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
                    <div className="card-header" style={{ color: "white" }}>SQL Statement</div>
                    <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <label>Statement Type:</label>
                            <DropDownListComponent
                                dataSource={this.statementTypes}
                                placeholder="Select a statement type."
                                value={this.state.statementType}
                                change={e => { this.updateStatementType(e.value) }} />
                        </div>
                        {returnSelection}
                        {outputSelection}
                        <div className="form-group">
                            <button className='e-control e-btn e-info' onClick={this.showEditor}>Define Tables</button>
                        </div>
                    </div>
                </div>
                <SidebarComponent isOpen={this.state.showEditor} type="Over" width="100%" position="Right" target="diagram" showBackdrop="false">
                    <div className="center-align">
                        <div className="container">
                            <div className="row">
                                <div className="col-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                    <div className="card bg-info mb-3" style={{ border: "none" }}>
                                        <div className="card-header" style={{ color: "white" }}>Tables Definition</div>
                                        <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                                            <div className="form-group">
                                                {/* Todo: enable code mirror */}
                                                <textarea
                                                    className="form-control z-depth-1"
                                                    rows="10"
                                                    placeholder="Type tables definition here"
                                                    value={this.state.tempDbScript}
                                                    onChange={e => { this.setState({ tempDbScript: e.target.value }) }} />
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
                                <StatementInstructions />
                            </div>
                        </div>
                    </div>
                </SidebarComponent>
            </div >);
    }

    refreshState = (settings) => {
        this.setState({ dbScript: settings.has('dbScript') ? settings.get('dbScript') : '' });
        this.setState({ statementType: settings.has('statementType') ? settings.get('statementType') : '' });
        this.setState({ returnType: settings.has('returnType') ? settings.get('returnType') : '' });
        this.setState({ outputName: settings.has('outputName') ? settings.get('outputName') : '' });
    }

    updateStatementType(newValue) {
        this.setState({ statementType: newValue });
        this.props.settings.set('statementType', newValue);
    }

    updateReturnType(newValue) {
        this.setState({ returnType: newValue });
        this.props.settings.set('returnType', newValue);
    }

    updateOutputName(newValue) {
        this.setState({ outputName: newValue });
        this.props.settings.set('outputName', newValue);
    }

    showEditor() {
        this.setState({ showEditor: true });
        this.props.expand();
    }

    cancelEditor() {
        this.setState({ tempDbScript: this.state.dbScript });
        this.setState({ showEditor: false });
        this.props.unexpand();
    }

    saveEditor() {
        this.setState({ dbScript: this.state.tempdbScript });
        this.setState({ showEditor: false });
        this.props.unexpand();
    }
}
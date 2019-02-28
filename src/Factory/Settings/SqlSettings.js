import React, { Component } from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import SqlInstructions from './SqlInstructions'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

class SqlSettings extends Component {
    constructor() {
        super();
        this.state = {
            componentName: '',
            databaseName: '',
            dbScript: '', tempDbScript: '',
            size: '',
            showEditor: false
        }

        this.updateComponentName = this.updateComponentName.bind(this);
        this.updateComponentName = this.updateDatabaseName.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.cancelEditor = this.cancelEditor.bind(this);
        this.saveEditor = this.saveEditor.bind(this);
    }

    sizes = ['', 'Free', 'Small', 'Medium', 'Large'];

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        return (
            <div>
                <div className="card bg-info mb-3" style={{ border: "none" }}>
                    <div className="card-header" style={{ color: "white" }}>SQL Settings</div>
                    <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                        <div className="form-group">
                            <label>Component Name:</label>
                            <input
                                type="text"
                                onChange={e => { this.updateComponentName(e.target.value) }}
                                className="form-control"
                                placeholder="Give component a name."
                                value={this.state.componentName}
                            />
                            <div className="form-group">
                                <label>Database Name:</label>
                                <input
                                    type="text"
                                    onChange={e => { this.updateDatabaseName(e.target.value) }}
                                    className="form-control"
                                    placeholder="Give database a name."
                                    value={this.state.databaseName}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button className='e-control e-btn e-info' onClick={this.showEditor}>Define Tables</button>
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
                                                    class="form-control z-depth-1"
                                                    rows="20"
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
                                <SqlInstructions />
                            </div>
                        </div>
                    </div>
                </SidebarComponent>
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ componentName: settings.has('componentName') ? settings.get('componentName') : '' });
        this.setState({ databaseName: settings.has('databaseName') ? settings.get('databaseName') : '' });
        this.setState({ dbScript: settings.has('dbScript') ? settings.get('dbScript') : '' });
        this.setState({ size: settings.has('size') ? settings.get('size') : '' });
    }

    updateComponentName(newValue) {
        this.setState({ componentName: newValue });
        this.props.settings.set('componentName', newValue);
    }

    updateDatabaseName(newValue) {
        this.setState({ databaseName: newValue });
        this.props.settings.set('databaseName', newValue);
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

export default SqlSettings;
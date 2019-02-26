import React, { Component } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

class SqlSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            componentName: '',
            databaseName: '',
            hideDialog : true
        }

        this.openTablesDialog = this.openTablesDialog.bind(this);
        this.closeTablesDialog = this.closeTablesDialog.bind(this);
        this.onTablesDialogOverlayClick = this.onTablesDialogOverlayClick(this);
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    render() {
        return (
            <div className="card border-info mb-3" id="test">
                <div className="card-header">SQL Settings</div>
                <div className="card-body text-left">
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
                        </div>
                        <label>Database Name:</label>
                        <input
                            type="text"
                            onChange={e => { this.updateDatabaseName(e.target.value) }}
                            className="form-control"
                            placeholder="Give database a name."
                            value={this.state.databaseName}
                        />
                    </div>
                    <div className="form-group">
                        <button className='e-control e-btn' onClick={this.openTablesDialog} >Define Tables</button>
                        <DialogComponent width='250px' isModal={true} visible={this.state.hideDialog} close={this.closeTablesDialog}
                            overlayClick={this.onTablesDialogOverlayClick} target='#diagram' >
                            This is a modal Dialog 
                        </DialogComponent>
                    </div>
                </div>
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ componentName: settings.has('componentName') ? settings.get('componentName') : '' });
        this.setState({ databaseName: settings.has('databaseName') ? settings.get('databaseName') : '' });
    }

    updateComponentName(newValue) {
        this.setState({ componentName: newValue });
        this.props.settings.set('componentName', newValue);
    }

    updateDatabaseName(newValue) {
        this.setState({ databaseName: newValue });
        this.props.settings.set('databaseName', newValue);
    }

    onTablesDialogOverlayClick = () => {
        this.setState({ hideDialog: false })
    }

    closeTablesDialog = () => {
        this.setState({ hideDialog: false })
    }

    openTablesDialog() {
        this.setState({ hideDialog: true })
    }

}

export default SqlSettings;
import React, { Component } from 'react';
import SqlSettings from './SqlSettings'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export default class SettingsContainer extends Component {
    constructor(props) {
        super(props);
        this.getSettingsComponent = this.getSettingsComponent.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state = { settingsCopy: new Map() }
    }

    componentWillReceiveProps(props) {
        this.reset(props.settings);
    }

    getSettingsComponent() {
        if (!this.props.settings)
            return null;

        switch (this.props.settings.get("type")) {
            case "SQL":
                return <SqlSettings settings={this.state.settingsCopy} compId={this.props.settings.get("id")} />;
            default: return null;
        }
    }

    render() {
        return (
            <SidebarComponent id="propeties-sidebar" isOpen={this.props.isOpen} type="Over" width="400px" position="Right" target="diagram" showBackdrop="true" style={{ marginTop: "70px" }}>
                <div className="center-align">
                    <div className="container" style={{ marginTop: "10px" }}>
                        <div className="row">
                            <div className="col-12">
                                {this.getSettingsComponent()}
                            </div>
                        </div>
                        <div className="row">
                            <ButtonComponent className="col-5" style={{ margin: "15px" }} cssClass='e-success' onClick={e => this.props.doneConfigure(this.state.settingsCopy)}>SAVE</ButtonComponent>
                            <ButtonComponent className="col-5" style={{ margin: "15px" }} cssClass='e-danger' onClick={this.cancel}>CANCEL</ButtonComponent>
                        </div>
                    </div>
                </div>
            </SidebarComponent>);
    }

    reset(settings) {
        this.setState({ settingsCopy: new Map(settings)});
    }

    cancel() {
        this.reset(this.props.settings); 
        this.props.cancelConfigure();
    }

    // updateSettings = (newSettings) =>
    // {
    //     this.setState({ settings : newSettings});
    // }
}
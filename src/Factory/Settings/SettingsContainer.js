import React, { Component } from 'react';
import SqlSettings from './SqlSettings'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export default class SettingsContainer extends Component {
    constructor(props) {
        super(props);
        this.getSettingsComponent = this.getSettingsComponent.bind(this);
        this.state = {
            settings: new Map()
        }

        this.setProperty = this.setProperty.bind(this);
        // if (props.settings) {
        //     this.state.settings.set("id", props.settings.get("id"));
        //     this.state.settings.set("type", props.settings.get("type"));
        // }
    }

    getSettingsComponent() {
        if (!this.props.settings)
            return null;

        switch (this.props.settings.get("type")) {
            case "SQL": return <SqlSettings settings={this.props.settings} setProperty={this.setProperty} />;
            default: return null;
        }
    }

    setProperty(key, value) {
        this.props.settings.set(key, value);
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
                            <ButtonComponent className="col-5" style={{ margin: "15px" }} cssClass='e-success' onClick={e => this.props.doneConfigure(this.props.settings)}>SAVE</ButtonComponent>
                            <ButtonComponent className="col-5" style={{ margin: "15px" }} cssClass='e-danger' onClick={this.props.cancelConfigure}>CANCEL</ButtonComponent>
                        </div>
                    </div>
                </div>
            </SidebarComponent>);
    }

    addSettings(key, value) {
        this.props.settings.set(key, value);
    }

}
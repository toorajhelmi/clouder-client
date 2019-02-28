import React, { Component } from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import SqlSettings from './SqlSettings'
import QueueSettings from './QueueSettings'
import RequestTriggerSettings from './RequestTriggerSettings'
import QueueTriggerSettings from './QueueTriggerSettings'
import TimerTriggerSettings from './TimerTriggerSettings'
import SqlStatementSettings from './SqlStatementSettings'

export default class SettingsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsCopy: new Map(),
            width: "400px"
        }

        this.getSettingsComponent = this.getSettingsComponent.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.expand = this.expand.bind(this);
        this.unexpand = this.unexpand.bind(this);
    }

    componentWillReceiveProps(props) {
        this.reset(props.settings);
    }

    getSettingsComponent() {
        if (!this.props.settings)
            return null;

        switch (this.props.settings.get("type")) {
            case "SQL":
                return <SqlSettings
                    settings={this.state.settingsCopy}
                    compId={this.props.settings.get("id")}
                    expand={this.expand} unexpand={this.unexpand} />;
            case "Queue":
                return <QueueSettings
                    settings={this.state.settingsCopy} />
            case "HTTP Request":
                return <RequestTriggerSettings
                    settings={this.state.settingsCopy} />;
            case "Queue Trigger":
                return <QueueTriggerSettings
                    settings={this.state.settingsCopy} />;
            case "Timer Trigger":
                return <TimerTriggerSettings
                    settings={this.state.settingsCopy} />;
            case "Straight":
            case "Orthogonal":
                return <SqlStatementSettings
                    settings={this.state.settingsCopy} 
                    expand={this.expand} unexpand={this.unexpand} />;
            default: return null;
        }
    }

    render() {
        return (
            <SidebarComponent id="propeties-sidebar" isOpen={this.props.isOpen} type="Over" width={this.state.width} position="Right" target="diagram" showBackdrop="true" style={{ marginTop: "70px" }}>
                <div className="center-align">
                    <div className="container">
                        <div className="row">
                            <div className="col-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
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
        this.setState({ settingsCopy: new Map(settings) });
    }

    cancel() {
        this.reset(this.props.settings);
        this.props.cancelConfigure();
    }

    expand() {
        this.setState({ width: "800px" })
    }

    unexpand() {
        this.setState({ width: "400px" })
    }
}
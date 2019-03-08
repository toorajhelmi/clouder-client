import * as React from 'react';
import axios from 'axios';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { DialogUtility } from '@syncfusion/ej2-popups';
import AzureSettings from './AzureSettings'

export default class Deploy extends React.Component {
    constructor() {
        super();

        this.state = {
            azureExpanded : false,
            awsExpanded : false,
            gcpExpanded : false
        }

        this.updateCloudType = this.updateCloudType.bind(this);
        this.deploy = this.deploy.bind(this);
        this.expandSettings = this.expandSettings.bind(this);
        this.getAzureSettings = this.getAzureSettings.bind(this);
    }

    cloudType = ['', 'Azure', 'AWS', 'GCP'];

    azureSettings = new Map();
    awsSettings = new Map();
    gcpSetttings = new Map();

    getAzureSettings() {
        return <AzureSettings settings={this.azureSettings}/>
    }

    getAwsSettings() {
        return <div />
    }

    getGcpSettings() {
        return <div />
    }

    render() {
        return (
            <SidebarComponent isOpen={this.props.isOpen} type="Over" width="400px" position="Right" target="diagram" showBackdrop="true" style={{ marginTop: "70px" }}>
                <div className="center-align">
                    <div className="container">
                        <div className="row">
                            <div className="col-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                <AccordionComponent expandMode='Single'>
                                    <AccordionItemsDirective>
                                        <AccordionItemDirective expanded={this.state.azureExpanded} header='Azure Settings' content={this.getAzureSettings} />
                                        <AccordionItemDirective expanded={this.state.awsExpanded}  header='AWS Settings' content={this.getAwsSettings} />
                                        <AccordionItemDirective expanded={this.state.gcpExpanded}  header='GCP Settings' content={this.getGcpSettings} />
                                    </AccordionItemsDirective>
                                </AccordionComponent>
                            </div>
                        </div>
                        <div className="row" style={{backgroundColor: "#2C3E4F", color:"white", padding: "20px"}}>
                            <div className="form-group" margin="20px">
                                <label>Deployment Target:</label>
                                <DropDownListComponent
                                    dataSource={this.cloudType}
                                    placeholder="Select a cloud."
                                    value={this.state.cloudType}
                                    change={e => { this.updateCloudType(e.value) }} 
                                    style={{backgroundColor: "white"}}/>
                            </div>
                            <ButtonComponent className="col-4" style={{ margin: "15px" }} cssClass='e-success' onClick={this.deploy}>Deploy</ButtonComponent>
                            <ButtonComponent className="col-4" style={{ margin: "15px" }} cssClass='e-danger' onClick={this.cancel}>Cancel</ButtonComponent>
                        </div>
                    </div>
                </div>
            </SidebarComponent>);
    }

    updateCloudType(value) {
        this.setState({cloudType: value});
        this.expandSettings();
    }

    deploy() {
        if (this.state.cloudType === "Azure") {
            if (!this.azureSettings.get('subscriptionId') ||
                !this.azureSettings.get('tenantId') ||
                !this.azureSettings.get('clientId') ||
                !this.azureSettings.get('clientSecret')) {
                DialogUtility.alert('Please complete Azure settings!');
                this.expandSettings();
            }
            else {
                axios.post('http://localhost:7071/api/user_update',
                this.factory);
            }
        }
    }

    //BUG: When expanfing from code, accordion show the functions code rather than the
    //component
    expandSettings() {
        // switch (this.state.cloudType) {
        //     case "Azure": this.setState({azureExpanded: true}); break;
        //     case "AWS": this.setState({awsExpanded: true}); break;
        //     case "GCP": this.setState({gcpExpanded: true}); break;
        //     default: break;
        //}
    }
}
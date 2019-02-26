import * as React from "react";
import {
    DiagramComponent,
    Inject,
    BpmnDiagrams,
    OverviewComponent
} from "@syncfusion/ej2-react-diagrams";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import SettingsContanier from './Settings/SettingsContainer'

const overviewStyle = {
    position: 'absolute',
    zIndex: '2',
    right: '10px',
    top: '70px',
    border: '1px solid red',
}

const toolStyle = {
    marginRight: "10px"
}

let pageSettings = {
    orientation: 'Landscape',
    showPageBreaks: true,
    multiplePage: true,
    background: {
        color: 'black'
    },
    width: 2000,
    height: 2000,
}

export default class Diagram extends React.Component {
    constructor() {
        super();
        this.state = {
            configuringComponent: false,
            selectedNodeId: "",
            lastSaved: ""
        }
        this.configure = this.configure.bind(this);
        this.doneConfigure = this.doneConfigure.bind(this);
        this.cancelConfigure = this.cancelConfigure.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.addNode = this.addNode.bind(this);
        this.getSelectedNodeSettings = this.getSelectedNodeSettings.bind(this);
        this.persist = this.persist.bind(this);
    }

    nodesSettings = new Map();

    render() {
        return (
            <div>
                <nav className="navbar top navbar-light bg-light">
                    <div>
                        <ButtonComponent cssClass='e-info' style={toolStyle} onClick={this.configure} disabled={!this.state.selectedNodeId}>Configure</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle} disabled={!this.state.selectedNodeId}>Clone</ButtonComponent>
                        <ButtonComponent cssClass='e-danger' style={toolStyle} disabled={!this.state.selectedNodeId}>Delete</ButtonComponent>
                    </div>
                </nav>
                <div>
                    <div>
                        {/* nodes={nodes} connectors={connectors} */}
                        <DiagramComponent id="diagram" width="100%" height="800px" pageSettings={pageSettings}
                            selectionChange={this.setSelected} drop={this.addNode} connectionChange={this.persist} positionChange={this.persist}>
                            <Inject services={[BpmnDiagrams]} />
                        </DiagramComponent>
                        <OverviewComponent id="overview" style={overviewStyle} sourceID="diagram" width={"200px"} height={"200px"} />
                    </div>
                    <SettingsContanier isOpen={this.state.configuringComponent} settings={this.getSelectedNodeSettings()}
                        doneConfigure={this.doneConfigure} cancelConfigure={this.cancelConfigure} />
                </div>
            </div>)
    }

    configure(e) {
        this.setState({ configuringComponent: true });
    }

    doneConfigure(settings) {
        this.nodesSettings.set(settings.get('id'), settings);
        this.setState({ configuringComponent: false });
    }

    cancelConfigure() {
        this.setState({ configuringComponent: false });
    }

    setSelected(e) {
        if (e.newValue && e.newValue.length === 1) {
            this.setState({ selectedNodeId: e.newValue[0].id });
        }
        else {
            this.setState({ selectedNodeId: "" })
        }
    }

    addNode(e) {
        var addedNode = e.element;
        var nodeSettings = new Map();
        nodeSettings.set("id", addedNode.id);
        //using node id as the default for componentName. Syncfusion generates a nice
        //unique name off of the comp type.
        nodeSettings.set("componentName", addedNode.id);
        nodeSettings.set("type", addedNode.oldProperties.id);

        this.nodesSettings.set(addedNode.id, nodeSettings);
    }

    getSelectedNodeSettings() {
        if (!this.nodesSettings)
            return null;

        return this.nodesSettings.get(this.state.selectedNodeId);
    }

    //BUG: this is called twice per node addition. Fix it
    persist() {
        const mapToObj = m => {
            return Array.from(m).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
        };

        var nodesList = [];
        this.nodesSettings.forEach((v, k, m) => {
            nodesList.push(mapToObj(v));
        });

        var diagramElement = document.getElementById('diagram');
        var diagram = diagramElement.ej2_instances[0];

        var graph = [];
        diagram.connectors.forEach(c =>
            graph.push({
                source: c.sourceID,
                target: c.targetID
            }));

        this.props.persist(
            diagram.saveDiagram(), 
            JSON.stringify(nodesList),
            JSON.stringify(graph));
    }
}
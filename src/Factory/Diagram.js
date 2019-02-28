import * as React from "react";
import {
    DiagramComponent,
    Inject,
    BpmnDiagrams,
    OverviewComponent,
    PortVisibility
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
    // background: {
    //     color: 'black'
    // },
    //width: 2000,
    //height: 2000,
}

export default class Diagram extends React.Component {
    constructor() {
        super();
        this.state = {
            configuringComponent: false,
            selectedNodeId: "",
            configureNodeId: "",
            lastSaved: ""
        }
        this.configure = this.configure.bind(this);
        this.doneConfigure = this.doneConfigure.bind(this);
        this.cancelConfigure = this.cancelConfigure.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.addNode = this.addNode.bind(this);
        this.getSelectedNodeSettings = this.getSelectedNodeSettings.bind(this);
        this.persistNodes = this.persistNodes.bind(this);
        this.persistNodesAndGraph = this.persistNodesAndGraph.bind(this);
        this.connectionChanged = this.connectionChanged.bind(this);
        this.setConfigure = this.setConfigure.bind(this);
        this.delete = this.delete.bind(this);
    }

    nodesSettings = new Map();

    ports = [
        {
            offset: { x: 0, y: 0.25 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 0, y: 0.50 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 0, y: 0.75 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.25 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.50 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.75 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        }]

    //This is good to have since diagram gets update everytime the props change, however,
    //having it makes the configure button enabling stop working.
    // shouldComponentUpdate(nextProps, __) {
    //     return this.props.configureNodeId !== nextProps.configureNodeId;
    // }
    
    render() {
        return (
            <div>
                <nav className="navbar top navbar-light bg-light">
                    <div>
                        <ButtonComponent cssClass='e-info' style={toolStyle} onClick={this.configure} disabled={!this.state.configureNodeId}>Configure</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle} disabled={!this.state.selectedNodeId}>Clone</ButtonComponent>
                        <ButtonComponent cssClass='e-danger' style={toolStyle} onClick={this.delete} disabled={!this.state.selectedNodeId}>Delete</ButtonComponent>
                    </div>
                </nav>
                <div>
                    <div id="diagramContainer">
                        <DiagramComponent id="diagram" width="100%" height="800px" pageSettings={pageSettings} canAutoScroll="false"
                            selectionChange={this.setSelected} drop={this.addNode} collectionChange={this.persistNodes} connectionChange={e => this.connectionChanged(e)} positionChange={this.persistNodes}>
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
            this.setState({ selectedNodeId: e.newValue[0]});
            this.setConfigure(e.newValue[0]);
        }
    }

    delete() {
        var diagramElement = document.getElementById('diagram');
        var diagram = diagramElement.ej2_instances[0];
        diagram.remove(this.state.selectedNodeId);
        this.setState({ selectedNodeId: ""});
        this.setState({ configureNodeId: ""});
    }

    clone() {
        //To do
       // var diagramElement = document.getElementById('diagram');
       // var diagram = diagramElement.ej2_instances[0];

       // diagram.remove(this.state.selectedNodeId);
       // this.setState({ selectedNodeId: ""});
       // this.setState({ configureNodeId: ""});
    }

    connectionChanged(e) {         
        this.setConfigure(e.connector);
        this.persistNodesAndGraph();
    }

    setConfigure(selected) {
        var canConfigure = false;

        if (selected.propName === "connectors") { //only allow config on arrows connected to DBs
            if ((selected.sourceID && selected.sourceID.includes("SQL")) |
                (selected.targetID && selected.targetID.includes("SQL"))) {
                canConfigure = true;
            }
        }
        else { //Can config all other elements
            canConfigure = true;
        }

        if (canConfigure) {
            this.setState({ configureNodeId: selected.id });
        }
        else {
            this.setState({ configureNodeId: "" })
        }
    }

    addNode(e) {
        var addedNode = e.element;
        var nodeSettings = new Map();
        nodeSettings.set("id", addedNode.id);

        //using node id as the default for componentName. Syncfusion generates a nice
        //unique name off of the comp type.
        nodeSettings.set("componentName", addedNode.id.replace(/\s+/g, ''));
        nodeSettings.set("type", addedNode.oldProperties.id);

        this.nodesSettings.set(addedNode.id, nodeSettings);

        if (addedNode.propName === "nodes") {
            addedNode.width = 100;
            addedNode.height = 100;
            var diagramElement = document.getElementById('diagram');
            var diagram = diagramElement.ej2_instances[0];
            diagram.addPorts(addedNode, this.ports);
        }
    }

    getSelectedNodeSettings() {
        if (!this.nodesSettings)
            return null;

        return this.nodesSettings.get(this.state.configureNodeId);
    }

    //BUG: this is called twice per node addition. Fix it
    persistNodes() {
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

        this.props.persist(
            diagram.saveDiagram(),
            JSON.stringify(nodesList),
            null);
    }

    persistNodesAndGraph() {
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
        diagram.connectors.forEach(c => {
            var sourcePortIndex = "";
            var targetPortIndex = "";

            if (c.sourceID && c.sourcePortID) {
                var sourceNode = diagram.nodes.find(n => n.id === c.sourceID);
                sourcePortIndex = sourceNode.ports.findIndex(p => p.id === c.sourcePortID);
            }
            
            if (c.targetID && c.targetPortID) {
                var targetNode = diagram.nodes.find(n => n.id === c.targetID);
                targetPortIndex = targetNode.ports.findIndex(p => p.id === c.targetPortID);
            }
            
            graph.push({
                source: c.sourceID + "-" + sourcePortIndex,
                target: c.targetID + "-" + targetPortIndex
            })
        });
    }
}
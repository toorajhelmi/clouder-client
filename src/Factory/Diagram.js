import * as React from "react";
import {
    DiagramComponent,
    Inject,
    BpmnDiagrams,
    OverviewComponent,
    PortVisibility,
    PrintAndExport
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
    constructor(props) {
        super(props);
        this.state = {
            configuringComponent: false,
            selectedNodeId: "",
            configureNodeId: "",
            lastSaved: "",
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
        this.export = this.export.bind(this);
        this.load = this.load.bind(this);
    }

    nodesSettings = new Map();

    //#region Port Defintions

    noInputTiggerPorts = [
        {
            offset: { x: 1, y: 0 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.1 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.2 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.3 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.4 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.6 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.7 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.8 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.9 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 1 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
    ]

    withInputTiggerPorts = [
        {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.1 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.2 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.3 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.4 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.5 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.6 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.7 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.8 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.9 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 1 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
    ]

    otherPorts = [
        {
            offset: { x: 0, y: 0.2 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 0, y: 0.4 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 0, y: 0.6 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 0, y: 0.8 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.2 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.4 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.6 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        },
        {
            offset: { x: 1, y: 0.8 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        }
    ]

    oneInputPorts = [
        {
            offset: { x: 0, y: 0.5 },
            visibility: PortVisibility.Visible,
            style: { fill: 'orange', strokeWidth: 2, strokeColor: 'white' },
            width: 12, height: 12, shape: 'Circle',
        }
    ]

    //#endregion

    componentDidMount() {
        this.props.exportAsDiagramCommand.execute = exportAs => this.export(exportAs);
        this.props.loadDiagramCommand.execute = factory => this.load(factory);
    }

    componentWillUnmount() {
        this.props.exportAsDiagramCommand.execute = null;
        this.props.loadDiagramCommand.execute = null;
    }

    //This is good to have since diagram gets update everytime the props change, however,
    //having it makes the configure button enabling stop working.
    // shouldComponentUpdate(nextProps, __) {
    //     return this.props.configureNodeId !== nextProps.configureNodeId;
    // }
    
    render() {
        return (
            <div id="this">
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
                            <Inject services={[BpmnDiagrams, PrintAndExport]} />
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
        this.persistNodes();
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

        else if (selected.id.includes("Else") || selected.id.includes("End If") ) {
            canConfigure = false;
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
            var diagramElement = document.getElementById('diagram');
            var diagram = diagramElement.ej2_instances[0];

            switch (addedNode.oldProperties.id)
            {
                case 'HTTP Request':
                    diagram.addPorts(addedNode, this.withInputTiggerPorts); 
                    addedNode.width = 40;
                    addedNode.height = 200;
                    break;
                case 'Timer Trigger':
                case 'Queue Trigger':
                    diagram.addPorts(addedNode, this.noInputTiggerPorts); 
                    addedNode.width = 40;
                    addedNode.height = 200;
                    break;
                case 'Outgoing Email':
                case 'Code':
                case 'Return':
                case 'HTTP Call':
                case 'If':
                case 'Else':
                case 'End':
                case 'New Variable':
                case 'Iterate':
                    diagram.addPorts(addedNode, this.oneInputPorts); 
                    addedNode.width = 50;
                    addedNode.height = 50;
                    break;
                default:
                    diagram.addPorts(addedNode, this.otherPorts); 
                    addedNode.width = 100;
                    addedNode.height = 100;
                    break;
            }     
        }
    }

    getSelectedNodeSettings() {
        if (!this.nodesSettings)
            return null;

        return this.nodesSettings.get(this.state.configureNodeId);
    }

    //#region persist & load

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
                target: c.targetID + "-" + targetPortIndex,
                connection: c.id
            })
        });

        this.props.persist(
            diagram.saveDiagram(),
            JSON.stringify(nodesList),
            JSON.stringify(graph));
    }

    export(exportAs, fileName) {
        if (exportAs) {
            var diagramElement = document.getElementById('diagram');
            var diagram = diagramElement.ej2_instances[0];

            if (exportAs === "PNG") {
                var options = {
                    mode: 'Download',
                    margin: { left: 10, right: 10, top: 10, bottom: 10 },
                    fileName: fileName,
                    format: 'PNG',
                    region: 'Content',
                };

                diagram.exportDiagram(options);
            }
            else if (exportAs === "PDF") {
                options = { 
                    mode: 'Data',
                    margin: { left: 10, right: 10, top: 10, bottom: 10 },
                    region: 'Content',
                    multiplePage: false,
                };
                diagram.print(options);
            }
        }
    }

    load(factory) {
        var diagramElement = document.getElementById('diagram');
        var diagram = diagramElement.ej2_instances[0];
        diagram.loadDiagram(factory.diagram);

        this.nodesSettings.clear();
        var nodeList = JSON.parse(factory.nodeSettings);
        nodeList.forEach(SettingsObj => {
            const settings = new Map(Object.entries(SettingsObj));
            this.nodesSettings.set(settings.get('id'), settings);
        });
    }

    //#endregion
}
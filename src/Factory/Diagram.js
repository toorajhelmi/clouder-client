import * as React from "react";
import {
    DiagramComponent,
    Inject,
    BpmnDiagrams,
    OverviewComponent
} from "@syncfusion/ej2-react-diagrams";
import {ButtonComponent} from '@syncfusion/ej2-react-buttons';
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

// let nodes = [
//     {
//         id: "node1",
//         height: 50,
//         width: 50,
//         offsetX: 100,
//         offsetY: 200
//     },
//     {
//         id: "node2",
//         height: 50,
//         width: 50,
//         offsetX: 200,
//         offsetY: 250
//     }
// ]

// let connectors = [
//     {
//         id: "connector1",
//         sourceID: "node1",
//         targetID: "node2"
//     }
// ];

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
            selectedNode: { id: ""},
            nodes: new Map()
        }
        this.configure = this.configure.bind(this);
        this.doneConfigure = this.doneConfigure.bind(this);
        this.cancelConfigure = this.cancelConfigure.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.addNode = this.addNode.bind(this);
    }
    
    render() {
        return (
            <div>
                <nav className="navbar top navbar-light bg-light">
                    <div>
                        <ButtonComponent cssClass='e-info' style={toolStyle} onClick={this.configure} disabled={!this.state.selectedNode.id}>Configure</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle} disabled={!this.state.selectedNode.id}>Clone</ButtonComponent>
                        <ButtonComponent cssClass='e-danger' style={toolStyle} disabled={!this.state.selectedNode.id}>Delete</ButtonComponent>
                    </div>
                </nav>
                <div>
                    <div>
                    {/* nodes={nodes} connectors={connectors} */}
                        <DiagramComponent id="diagram" width="100%" height="800px" pageSettings={pageSettings} 
                            selectionChange={this.setSelected} drop={this.addNode}>
                            <Inject services={[BpmnDiagrams]} />
                        </DiagramComponent>
                        <OverviewComponent id="overview" style={overviewStyle} sourceID="diagram" width={"200px"} height={"200px"} />
                    </div>
                    <SettingsContanier isOpen={this.state.configuringComponent} settings={this.state.nodes.get(this.state.selectedNode.id)} 
                        doneConfigure={this.doneConfigure} cancelConfigure={this.cancelConfigure}/>
                </div>
            </div>)
    }

    configure(e) {
        this.setState({configuringComponent: true});
    }

    doneConfigure(settings) {
        this.state.nodes.set(settings.id, settings);
        this.setState({configuringComponent: false});
    }

    cancelConfigure() {
        this.setState({configuringComponent: false});
    }

    setSelected(e)
    {
        if (e.newValue && e.newValue.length === 1)
        {
            this.setState({selectedNode: e.newValue[0]});
        }
        else
        {
            this.setState({selectedNode: { id: ""}})
        }
    }

    addNode(e)
    {
        var addedNode = e.element;
        var nodeSettings = new Map();
        nodeSettings.set("id", addedNode.id);
        nodeSettings.set("type", addedNode.oldProperties.id);
        this.state.nodes.set(addedNode.id, nodeSettings);
    }
}
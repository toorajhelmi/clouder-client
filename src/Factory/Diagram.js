import * as React from "react";
import {
    DiagramComponent,
    Inject,
    BpmnDiagrams,
    OverviewComponent
} from "@syncfusion/ej2-react-diagrams";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

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

let nodes = [
    {
        id: "node1",
        height: 50,
        width: 50,
        offsetX: 100,
        offsetY: 200
    },
    {
        id: "node2",
        height: 50,
        width: 50,
        offsetX: 200,
        offsetY: 250
    }
]

let connectors = [
    {
        id: "connector1",
        sourceID: "node1",
        targetID: "node2"
    }
];

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
    render() {
        return (
            <div>
                <nav className="navbar top navbar-light bg-light">
                    <div>
                        <ButtonComponent cssClass='e-info' style={toolStyle}>Configure</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle}>Clone</ButtonComponent>
                        <ButtonComponent cssClass='e-danger' style={toolStyle}>Delete</ButtonComponent>
                    </div>
                </nav>
                <div>
                    <DiagramComponent id="diagram" width="100%" height="800px" nodes={nodes} connectors={connectors} pageSettings={pageSettings}>
                        <Inject services={[BpmnDiagrams]} />
                    </DiagramComponent>
                    <OverviewComponent id="overview" style={overviewStyle} sourceID="diagram" width={"200px"} height={"200px"} />
                </div>
            </div>)
    }
}
import * as React from "react";
import {
    SymbolPaletteComponent,
    Inject,
    BpmnDiagrams,
} from "@syncfusion/ej2-react-diagrams";

export default class Palette extends React.Component {
    getDataSourceShapes() {
        let datasourcesShapes = [
            {
                id: 'SQL',
                shape: {
                    type: 'Bpmn',
                    shape: 'DataSource',
                },
            },
            {
                id: 'No-SQL',
                shape: {
                    type: 'Bpmn',
                    shape: 'DataObject'
                }
            },
        ];
        return datasourcesShapes;
    }

    getTriggerShapes() {
        let triggerShapes = [
            {
                id: 'Timer',
                shape: {
                    type: 'Bpmn',
                    event: {
                        event: 'Start',
                        trigger: 'Timer'
                    }
                },
            },
            {
                id: 'Queue',
                shape: {
                    type: 'Bpmn',
                    event: {
                        event: 'Start',
                        trigger: 'Conditional'
                    }
                },
            },
            {
                id: 'HTTP Request',
                shape: {
                    type: 'Bpmn',
                    event: {
                        event: 'Start',
                        trigger: 'Error'
                    }
                },
            }
        ];

        return triggerShapes;
    }
    getActionShapes() {
        let actionShapes = [
            {
                id: 'Outgoing Email',
                shape: {
                    type: 'Bpmn',
                    shape: 'Message'
                }
            },
            {
                id: 'HTTP Call',
                shape: {
                    type: 'Bpmn',
                    shape: 'Activity',
                    activity: {
                        activity: 'Task',
                        task: {
                            type: 'Script'
                        }
                    },
                }
            },
        ];

        return actionShapes;
    }

    getSecurityShapes() {
        let securityShapes = [{
            id: 'AD',
            shape: {
                type: 'Flow',
                shape: 'Process'
            }
        },
        {
            id: 'OAuth',
            shape: {
                type: 'Flow',
                shape: 'Document'
            }
        },
        {
            id: 'KMS',
            shape: {
                type: 'Flow',
                shape: 'PreDefinedProcess'
            }
        }];

        return securityShapes;
    }

    getConnectors() {
        let connectorSymbols = [{
            id: 'Orthogonal',
            type: 'Orthogonal',
            sourcePoint: {
                x: 0,
                y: 0
            },
            targetPoint: {
                x: 40,
                y: 40
            },
            targetDecorator: {
                shape: 'Arrow',
                style: {
                    fill: 'orange',
                    strokeColor: 'orange'
                }
            },
            style: {
                strokeColor: 'orange',
                fill: 'orange'
            }
        },
        {
            id: 'Straight',
            type: 'Straight',
            sourcePoint: {
                x: 0,
                y: 0
            },
            targetPoint: {
                x: 40,
                y: 40
            },
            targetDecorator: {
                shape: 'Arrow',
                style: {
                    fill: 'orange',
                    strokeColor: 'orange'
                }
            },
            style: {
                strokeColor: 'orange',
                fill: 'orange'
            }
        }
        ];

        return connectorSymbols;
    }
    render() {
        return <SymbolPaletteComponent id="diagram1" width="300px" expandMode={"Multiple"}
            palettes={
                [
                    {
                    id: 'datasources',
                    expanded: true,
                    symbols: this.getDataSourceShapes(),
                    title: 'Data Sources',
                },
                {
                    id: 'trigger',
                    expanded: true,
                    symbols: this.getTriggerShapes(),
                    title: 'Triggers',
                },
                {
                    id: 'action',
                    expanded: true,
                    symbols: this.getActionShapes(),
                    title: 'Actions',
                },
                {
                    id: 'connectors',
                    expanded: true,
                    symbols: this.getConnectors(),
                    title: 'Connectors',
                }
                ]
            }
            symbolHeight={
                80
            }
            symbolWidth={
                80
            }
        >
            <Inject services={[BpmnDiagrams]} />
        </SymbolPaletteComponent>;
    }
}
import * as React from 'react';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import Diagram from './Diagram'
import Editor from './Editor';

export default class Designer extends React.Component {
    constructor(props) {
        super(props);
        this.getDiagram = this.getDiagram.bind(this); 
        this.getEditor = this.getEditor.bind(this);
    }

    headerText = [{ text: "Diagram" }, { text: "CADL" }];
    
    getDiagram() {
        return <Diagram persist={this.props.persist} 
            exportAsDiagramCommand={this.props.exportAsDiagramCommand}
            loadFactoryCommand={this.props.loadFactoryCommand}/>
    }

    getEditor() {
        return <Editor getCadl={this.props.getCadl}/>
    }

    render() {
        return (
            <div>
                <TabComponent style={{ width: "100%" }} selecting={this.tabSwitched}>
                    <TabItemsDirective>
                        <TabItemDirective header={this.headerText[0]} content={this.getDiagram} />
                        <TabItemDirective header={this.headerText[1]} content={this.getEditor} />
                </TabItemsDirective>
                </TabComponent>
            </div>
        );
    }

    tabSwitched(e) {
        if (e.selectingIndex === 1) { //CADL tab
            
        }
    }
}
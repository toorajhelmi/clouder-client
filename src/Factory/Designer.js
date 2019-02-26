import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import * as React from 'react';
import Diagram from './Diagram'

export default class Designer extends React.Component {
    constructor(props) {
        super(props);
        this.getDiagram = this.getDiagram.bind(this); 
    }

    headerText = [{ text: "Diagram" }, { text: "Code" }];
    
    getDiagram() {
        return <Diagram persist={this.props.persist}/>
    }

    render() {
        return (
            <div>
                <TabComponent style={{ width: "100%" }} >
                    <TabItemsDirective>
                        <TabItemDirective header={this.headerText[0]} content={this.getDiagram} />
                        <TabItemDirective header={this.headerText[1]} />>
                </TabItemsDirective>
                </TabComponent>
            </div>
        );
    }
}
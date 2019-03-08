import * as React from 'react';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import Diagram from './Diagram'
import Editor from './Editor';

export default class Designer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateEditor: true
        }

        this.getDiagram = this.getDiagram.bind(this); 
        this.getEditor = this.getEditor.bind(this);
        this.tabSwitched = this.tabSwitched.bind(this);
    }

    headerText = [{ text: "Diagram" }, { text: "CADL" }];
    
    //Commands

    updateEditorCommand = {
        execute: null
    }

    loadDiagramCommand = {
        execute: null
    }

    // loadEditorCommand = {
    //     execute: null
    // }

    componentDidMount() {
        var loadDiagramCommand = this.loadDiagramCommand;
        //var loadEditorCommand = this.loadEditorCommand;
        this.props.loadFactoryCommand.execute = factory => {
            loadDiagramCommand.execute(factory);
            //loadEditorCommand.execute(factory.script);
        }
    }

    componentWillUnmount() {
        this.props.loadFactoryCommand.execute = null;
    }

    getDiagram() {
        return <Diagram persist={this.props.persist} 
            exportAsDiagramCommand={this.props.exportAsDiagramCommand}
            loadDiagramCommand={this.loadDiagramCommand}/>
    }

    getEditor() {
        return <Editor persist={this.props.persist}
            getCadl={this.props.getCadl} 
            updateEditorCommand={this.updateEditorCommand}
            loadEditorCommand={this.loadEditorCommand} //This is not called since Editor is not visible at the begginign
            script={this.props.factory.script}/>
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
            if (this.updateEditorCommand.execute) {
                this.updateEditorCommand.execute(this.props.diagramUpdatedAt);
            }
        }
    }
}
import * as React from 'react';
import axios from 'axios';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import Palette from './Palette'
import Designer from './Designer'
import StatusBar from './StatusBar'
import Export from './Export';
import Import from './Import.js';

const toolStyle = {
    marginRight: "10px",
}

export default class Factory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSaved: 'Not Saved.',
            exportDialogVisibility: false,
            importDialogVisibility: false,
            factoryChanged: false
        };

        this.persist = this.persist.bind(this);
        this.persistToBackend = this.persistToBackend.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.exportAsZip = this.exportAsZip.bind(this);
        this.exportAsCadl = this.exportAsCadl.bind(this);
        this.import = this.import.bind(this);
        this.load = this.load.bind(this);
        this.download = this.download.bind(this);
        this.getCadl = this.getCadl.bind(this);
    }

    //Fields

    factory = null;
    notSaved = false;
    diagramUpdatedAt = null;

    //Commands

    exportAsDiagramCommand = {
        execute: null
    }

    loadFactoryCommand = {
        execute: null
    }

    async componentDidMount() {
        setInterval(async () => { await this.persistToBackend() }, 1000);
        const fullFactory = (await axios.get(`http://localhost:7071/api/factory_get?id=${this.factory.id}`)).data;
        this.factory = fullFactory;
        this.load(this.factory);
    }
    
    render() {       
        if (this.props.location.state.factory) {
            this.factory = this.props.location.state.factory;
        }

        return (
            <div style={{ width: "100%", height:"1000px", marginTop: "70px" }} id="factory">
                <DialogComponent width='500px' target='#factory' isModal={true} visible={this.state.exportDialogVisibility} 
                    overlayClick={this.onOverlayClick}>
                    <Export 
                        exportAsZip={this.exportAsZip} 
                        exportAsDiagram={exportAs => this.exportAsDiagramCommand.execute(exportAs, this.factory.name)} 
                        exportAsCadl={this.exportAsCadl}
                        exportSelected={() => this.setState({exportDialogVisibility: false})}/>
                </DialogComponent>
                <DialogComponent width='500px' target='#factory' isModal={true} visible={this.state.importDialogVisibility} 
                    overlayClick={this.onOverlayClick} BeforeOpenEventArgs={e => e.maxHeight="auto"}>
                    <Import import={file => this.import(file)}/>
                </DialogComponent>
                <div>
                    <div style={{ width: "300px", float: "left" }}> 
                        <Palette/>
                    </div>
                    <div style={{ marginLeft: "300px" }}> 
                        <Designer persist={this.persist} 
                            exportAsDiagramCommand={this.exportAsDiagramCommand}
                            loadFactoryCommand={this.loadFactoryCommand}
                            getCadl={this.getCadl}
                            diagramUpdatedAt={this.diagramUpdatedAt}
                            factory={this.factory}/>
                    </div>
                </div>
                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <StatusBar lastUpdated={this.state.lastSaved} />
                    <div>
                        <ButtonComponent cssClass='e-info' style={toolStyle} disabled={!this.state.factoryChanged}
                            onClick={e => this.setState({exportDialogVisibility: true})}>Export</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle} 
                            onClick={e => this.setState({importDialogVisibility: true})}>Import</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle}>Deploy</ButtonComponent>
                        <ButtonComponent cssClass='e-success' style={toolStyle}>Publish</ButtonComponent>
                    </div>
                </nav>
            </div>
        )
    }

    async persist(diagram, nodeSettings, graph, script) {
        if (diagram) {
            this.factory.diagram = diagram;
            this.diagramUpdatedAt = (new Date()).toLocaleTimeString();
        }
        if (nodeSettings) {
            this.factory.nodeSettings = nodeSettings;
            this.diagramUpdatedAt = (new Date()).toLocaleTimeString();
        }
        if (graph) {
            this.factory.graph = graph;
            this.diagramUpdatedAt = (new Date()).toLocaleTimeString();
        }
        if (script) {
            this.factory.script = script;
        }

        this.setState({ factoryChanged: true});
        this.notSaved = true;
    }

    async persistToBackend() {
        if (this.notSaved) {
            this.notSaved = false;
            await axios.post('http://localhost:7071/api/factory_update',
                this.factory);

            this.setState({ lastSaved: (new Date()).toLocaleTimeString() });
        }
    }

    onOverlayClick() {
        this.setState({exportDialogVisibility: false});
        this.setState({importDialogVisibility: false});
    }

    exportAsZip() {
        var jsZip = require("jszip");
        var zip = new jsZip();
        var download = this.download;
        var fileName = this.factory.name + ".zip";
        zip.folder(this.factory.name)
            .file("settings.json", this.factory.nodeSettings)
            .file("diagram.json", this.factory.diagram)
            .file("graph.json", this.factory.graph);
        zip.generateAsync({type:"blob"}).then(function (blob) {
            download(blob, fileName)
        });
    }

    async getCadl() {
        if (this.notSaved) {
            await this.persistToBackend();
        }
        const cadl = (await axios.get(`http://localhost:7071/api/cadl_get?id=${this.factory.id}`)).data;
        return cadl;
    }

    async exportAsCadl() {
        var fileName = this.factory.name + ".cadl";
        var cadl = await this.getCadl();
        var blob = new Blob([cadl], 
        {
            type : "text/plain;charset=utf-8"
        });
        
        this.download(blob, fileName);
    }

    download(blob, fileName) {
        var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.download = fileName;
            a.href = url;
            a.textContent = "";
            a.click();
        URL.revokeObjectURL(url);
    }

    async import(file) {
        this.setState({ importDialogVisibility: false });
        var jsZip = require('jszip');
        var importedFactory = {};
        var loadFactory = this.load;
        jsZip.loadAsync(file).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
                    zip.files[filename].async('string').then(function (fileData) {
                        if (filename.includes("settings.json")) {
                            importedFactory.nodeSettings = fileData;
                        }
                        else if (filename.includes("diagram.json")) {
                            importedFactory.diagram = fileData;
                        }
                        else if (filename.includes("graph.json")) {
                            importedFactory.graph = fileData;
                        }  
                        
                        if (importedFactory.nodeSettings && importedFactory.diagram && importedFactory.graph) {
                            loadFactory(importedFactory);
                        }
                    });
            })
        })
    }

    load(importedFactory) {
        try {
            this.loadFactoryCommand.execute(importedFactory);

            this.factory.nodeSettings = importedFactory.nodeSettings;
            this.factory.diagram = importedFactory.diagram;
            this.factory.graph = importedFactory.graph;
            this.setState({ factoryChanged: true});
        }
        catch (e) {

        }
    }
}
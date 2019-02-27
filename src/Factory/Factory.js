import * as React from 'react';
import Palette from './Palette'
import Desginer from './Designer'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import axios from 'axios';
import StatusBar from './StatusBar'

const toolStyle = {
    marginRight: "10px"
}

export default class Designer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastUpdated: 'Not Saved.',
        };

        this.persist = this.persist.bind(this);
        this.persistToBackend = this.persistToBackend.bind(this);
    }

    factoryChanged = false;
    factory = null;

    componentDidMount() {
        this.id = this.props.match.params.id;
        setInterval(async () => { await this.persistToBackend() }, 60000);
    }

    render() {
        return (
            <div style={{ width: "100%", marginTop: "70px" }}>
                <div>
                    <div style={{ width: "300px", float: "left" }}> <Palette /></div>
                    <div style={{ marginLeft: "300px" }}> <Desginer persist={this.persist} /> </div>
                </div>
                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <StatusBar lastUpdated = {this.state.lastUpdated}/>
                    <div>
                        <ButtonComponent cssClass='e-info' style={toolStyle}>Deploy</ButtonComponent>
                        <ButtonComponent cssClass='e-info' style={toolStyle}>Export</ButtonComponent>
                        <ButtonComponent cssClass='e-success' style={toolStyle}>Publish</ButtonComponent>
                    </div>
                </nav>
            </div>
        )
    }
    toggleClick() {
        this.sidebar.toggle();
    }

    async persist(nodes, nodeSettings, graph) {
        this.factory = {
            id: this.id,
            diagram: nodes,
            nodeSettings: nodeSettings,
            graph: graph,
            name: "",
            description: ""
        };

        this.factoryChanged = true;
    }

    async persistToBackend() {
        if (this.factoryChanged) {
            this.factoryChanged = false;
            await axios.post('http://localhost:7071/api/Factory_Update',
                this.factory);

            this.setState({ lastUpdated: (new Date()).toLocaleTimeString() });
        }
    }
}
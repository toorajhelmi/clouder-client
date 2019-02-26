import * as React from 'react';
import Palette from './Palette'
import Desginer from './Designer'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import axios from 'axios';

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
    }

    id = "";

    componentDidMount () {
        this.id  = this.props.match.params.id;
    }

    render() {
        return (
            <div style={{ width: "100%", marginTop: "70px" }}>
                <div>
                    <div style={{ width: "300px", float: "left" }}> <Palette /></div>
                    <div style={{ marginLeft: "300px" }}> <Desginer persist={this.persist}/> </div>
                </div>
                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <div>
                        Last Saved: {this.state.lastUpdated}
                    </div>
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
        this.setState({lastUpdated: (new Date()).toLocaleTimeString()});

        var factory = {
            id: this.id,
            diagram: nodes,
            nodeSettings: nodeSettings,
            graph: graph,
            name: "",
            description: ""
        };
        
        await axios.post('http://localhost:7071/api/Factory_Update', 
            factory);

        // }, {
            //   headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
            // });
    }
}
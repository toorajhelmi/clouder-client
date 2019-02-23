import * as React from 'react';
import Palette from './Palette'
import Desginer from './Designer'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const toolStyle = {
    marginRight: "10px"
}

export default class Designer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebar: null,
        };
    }
    render() {
        return (
            <div style={{ width: "100%", marginTop: "70px" }}>
                <div>
                    <div style={{ width: "300px", float: "left" }}> <Palette /></div>
                    <div style={{ marginLeft: "300px" }}> <Desginer /> </div>
                </div>
                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <span/>
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
}

/* COuld not control openning and closing so for now decided to use a simple div
 <SidebarComponent id="dockBar" ref={Sidebar => this.sidebar = Sidebar} dockSize="50px" width="300px" style={{ marginTop: "70px" }} >
                        <div className="dock">
                            <span id="toggle" margin="20px" onClick={this.toggleClick.bind(this)} >
                                <span className="e-icons expand"> &lt; </span>
                            </span>
                            <span className="sidebar-item">
                                <Palette />
                            </span>
                        </div>
                    </SidebarComponent>

                    <div id="main-content container-fluid col-md-12" style={{ marginTop: "70px"}}>
                        <Desginer />
                    </div> */
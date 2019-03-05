import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export default class Export extends React.Component {
    constructor() {
        super();
        this.exportSelected = this.exportSelected.bind(this);
    }
    
    render() {
        return (
            <div>
                <ButtonComponent cssClass='e-outline' style={{ width: "100%", padding:"0px" }} onClick={e => this.exportSelected("CADL")}>
                    <div style={{width: "100%", overflow: "hidden"}}>
                        <div style={{width: "150px", height:"100px", float: "left", backgroundColor: "#117AA1", textAlign: "center"}}> 
                            <div style={{ marginTop: "40px", fontSize:"40px", color:"white"}}>
                                CADL
                            </div>
                        </div>
                        <div style={{marginLeft: "150px"}}> 
                            <p className="wordwrap" style={{ marginTop:"10px", marginLeft: "10px", fontSize:"15px", textAlign: "left"}}>
                                Export factory as a CADL script and save it locally. Ths CADL script can be deployed to clouds but cannot be opened in the desginer.
                            </p>
                        </div>
                    </div>
                </ButtonComponent>
                <ButtonComponent cssClass='e-outline' style={{ width: "100%", padding:"0px" }} onClick={e => this.exportSelected("ZIP")}>
                    <div style={{width: "100%", overflow: "hidden"}}>
                        <div style={{width: "150px", height:"100px", float: "left", backgroundColor: "black", textAlign: "center"}}> 
                            <div style={{ marginTop: "40px", fontSize:"40px", color:"white"}}>
                                ZIP
                            </div>
                        </div>
                        <div style={{marginLeft: "150px"}}> 
                            <p className="wordwrap" style={{ marginTop:"10px", marginLeft: "10px", fontSize:"15px", textAlign: "left"}}>
                                Export factory as a ZIP package. The package can be shared with others. You will be able to import it back into clouder.
                            </p>
                        </div>
                    </div>
                </ButtonComponent>
                <ButtonComponent cssClass='e-outline' style={{ width: "100%", padding:"0px" }} onClick={e => this.exportSelected("PDF")}>
                    <div style={{width: "100%", overflow: "hidden"}}>
                        <div style={{width: "150px", height:"100px", float: "left", backgroundColor: "red", textAlign: "center"}}> 
                            <div style={{ marginTop: "40px", fontSize:"40px", color:"white"}}>
                                PDF
                            </div>
                        </div>
                        <div style={{marginLeft: "150px"}}> 
                            <p className="wordwrap" style={{ marginTop:"40px", marginLeft: "10px", fontSize:"15px", textAlign: "left"}}>
                                Export the diagram as PDF document.
                            </p>
                        </div>
                    </div>
                </ButtonComponent>
                <ButtonComponent cssClass='e-outline' style={{ width: "100%", padding:"0px" }} onClick={e => this.exportSelected("PNG")}>
                    <div style={{width: "100%", overflow: "hidden"}}>
                        <div style={{width: "150px", height:"100px", float: "left", backgroundColor: "green", textAlign: "center"}}> 
                            <div style={{ marginTop: "40px", fontSize:"40px", color:"white"}}>
                                PNG
                            </div>
                        </div>
                        <div style={{marginLeft: "150px"}}> 
                            <p className="wordwrap" style={{ marginTop:"40px", marginLeft: "10px", fontSize:"15px", textAlign: "left"}}>
                                Export the diagram as an image.
                            </p>
                        </div>
                    </div>
                </ButtonComponent>
            </div>
        );
    }

    exportSelected(exportAs) {
        this.props.exportSelected();

        switch (exportAs)
        {
            case "ZIP": this.props.exportAsZip(); break;
            case "CADL": this.props.exportAsCadl(); break;
            case "PDF": this.props.exportAsDiagram("PDF"); break;
            case "PNG": this.props.exportAsDiagram("PNG"); break;
            default: break;
        }
    }
}
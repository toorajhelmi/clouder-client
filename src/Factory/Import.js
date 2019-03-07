import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export default class Export extends React.Component {
    constructor() {
        super();
        this.fileSelected = this.fileSelected.bind(this);
    }

    selectedFileDialog = null;

    render() {
        return (
            <div>
                <input id="myInput"
                    type="file"
                    ref={(ref) => this.selectedFileDialog = ref}
                    style={{ display: 'none' }}
                    accept=".zip"
                    onChange={this.fileSelected}
                />
                <ButtonComponent cssClass='e-info' style={{ width: "100%", padding:"0px", margin:"5px" }} onClick={() => {this.selectedFileDialog.click()}}>
                    <div style={{width: "100%", fontSize:"15px", padding:"10px"}}>
                        Click here to select a zip package for importing
                    </div>
                </ButtonComponent>
            </div>
        );
    }

    fileSelected(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        this.props.import(file);
    }
}
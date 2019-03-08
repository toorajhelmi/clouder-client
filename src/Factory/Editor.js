import * as React from 'react';
import { DialogUtility } from '@syncfusion/ej2-popups';

const codeStyle = {
    overflowY: "scroll",
    height: "800px",
    resize: "none",
    width: "80%",
    border: "none",
    backgroundColor: "#252526",
    color: "yellow",
    fontSize: "15px",
    marginTop: "20px",
    marginLeft: "10px",
}

const numbersStyle = {
    overflowY: "hidden",
    height: "800px",
    resize: "none",
    width: "80%",
    border: "none",
    backgroundColor: "#252526",
    color: "lightgray",
    fontSize: "15px",
    marginTop: "10px",
    marginLeft: "20px",
}

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            codeLastUpdated: null,
        }

        this.lineNumbersRef = React.createRef();
        this.editorRef = React.createRef();
        this.getLineNumbers = this.getLineNumbers.bind(this);
        this.scroll = this.scroll.bind(this);
        this.changeCode = this.changeCode.bind(this);
        this.shouldRefresh = this.shouldRefresh.bind(this);
        this.refresh = this.refresh.bind(this);
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        this.props.updateEditorCommand.execute = diagramUpdatedAt => this.shouldRefresh(diagramUpdatedAt);
        this.props.loadEditorCommand.execute = script => this.load(script);
        if (this.props.script) {
            this.load(this.props.script);
        }
        else {
            this.refresh();
        }
    }

    componentWillUnmount() {
        this.props.updateEditorCommand.execute = null;
        this.props.loadEditorCommand.execute = null;
    }

    //Note: this will eventually replaced with CodeMirror or equivalent
    render() {
        return(
            <div style={{backgroundColor: "black"}} id="editor">
                <div style={{float: "left", width:"40px"}}> 
                    <textarea style={numbersStyle} value={this.getLineNumbers()} ref={this.lineNumbersRef} onChange={e => {}}/>
                </div>
                <div style={{marginLeft: "40px"}}>
                    <textarea rows="50" value={this.state.code} style={codeStyle} ref={this.editorRef}
                        onChange={e => { this.changeCode(e.target.value) }} onScroll={this.scroll}/>
                </div>
            </div>
        );
    }

    changeCode(newCode) {
        this.setState({ codeLastUpdated: (new Date()).toLocaleTimeString()});
        this.setState({ code: newCode });
        this.props.persist(null, null, null, newCode);
    }

    getLineNumbers() {
        var lines = this.state.code.split("\n");
        var lineNumbers = "";
        for (var i = 1; i <= lines.length; i++) {
            lineNumbers += i + "\n";
        }

        return lineNumbers;
    }

    scroll(e) {
        this.lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }

    shouldRefresh(diagramUpdatedAt) {
        if (!diagramUpdatedAt || diagramUpdatedAt === "Not Saved."
            || this.state.codeLastUpdated > diagramUpdatedAt) {
            //Do nothing
        }
        else {
            var confirm = DialogUtility.confirm({
                title: 'Code Conflict',
                content: 'You have updated the diagram after changing the code directly in the editor. Do you want to discard the changes you made in the editor and re-generate CADL based on your daigram?',
                okButton: { text: 'Yes', click: e => { this.refresh(); confirm.visible = false }},
                cancelButton: { text: 'No', click: e => {
                    this.setState({ codeLastUpdated: (new Date()).toLocaleTimeString()}); confirm.visible = false }},
                });
                confirm.target='#editor';
        }
    }

    async refresh() {
        var diagramCadl = await this.props.getCadl();
            this.setState({ code: diagramCadl});
            this.setState({ codeLastUpdated: (new Date()).toLocaleTimeString()});
    }

    load(script) {
        this.setState({ code: script});
        this.setState({ codeLastUpdated: (new Date()).toLocaleTimeString()});
    }
}

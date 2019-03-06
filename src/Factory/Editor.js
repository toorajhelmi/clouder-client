import * as React from 'react';

const codeStyle = {
    overflowY: "scroll",
    height: "800px",
    resize: "none",
    width: "80%",
    border: "none",
    backgroundColor: "#252526",
    color: "#f7cc22",
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
            code: ""
        }

        this.lineNumbersRef = React.createRef();
        this.getLineNumbers = this.getLineNumbers.bind(this);
        this.scroll = this.scroll.bind(this);
    }

    async componentDidMount() {
        this.setState({code: await this.props.getCadl()});

    }
    render() {
        return(
            <div style={{backgroundColor: "black"}}>
                <div style={{float: "left", width:"40px"}}> 
                    <textarea style={numbersStyle} value={this.getLineNumbers()} ref={this.lineNumbersRef}/>
                </div>
                <div style={{marginLeft: "40px"}}>
                    <textarea rows="50" value={this.state.code} style={codeStyle} 
                        onChange={e => { this.setState({ code: e.target.value }) }} onScroll={this.scroll}/>
                </div>
            </div>
        );
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
}
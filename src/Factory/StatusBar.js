import { Component } from 'react';

export default class StatusBar extends Component {
    render() {
        return ("Last Saved: " + this.props.lastUpdated);
    }
}
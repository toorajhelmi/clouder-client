import React, { Component } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export default class QueueSettings extends Component {
    constructor() {
        super();
        this.state = {
            componentName: '',
            queueName: '',
            size: '',
        }

        this.refreshState = this.refreshState.bind(this);
        this.updateComponentName = this.updateComponentName.bind(this);
        this.updateQueueName = this.updateQueueName.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    componentWillReceiveProps(props) {
        this.refreshState(props.settings);
    }

    sizes = ['','Free', 'Small', 'Medium', 'Large'];

    render() {
        return (
            <div className="card bg-info mb-3" style={{ border: "none" }}>
                <div className="card-header" style={{ color: "white" }}>Queue Settings</div>
                <div className="card-body text-left" style={{ backgroundColor: "white" }}>
                    <div className="form-group">
                        <label>Component Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give component a name."
                            value={this.state.componentName}
                            onChange={e => { this.updateComponentName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Queue Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Give function a name."
                            value={this.state.queueName}
                            onChange={e => { this.updateQueueName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Size:</label>
                        <DropDownListComponent
                            dataSource={this.sizes}
                            placeholder="Select a size."
                            value={this.state.size}
                            change={e => { this.updateSize(e.value) }} />
                    </div>
                </div>
            </div>);
    }

    refreshState = (settings) => {
        this.setState({ componentName: settings.has('componentName') ? settings.get('componentName') : '' });
        this.setState({ queueName: settings.has('queueName') ? settings.get('queueName') : '' });
        this.setState({ size: settings.has('size') ? settings.get('size') : '' });
    }

    updateComponentName(newValue) {
        this.setState({ componentName: newValue });
        this.props.settings.set('componentName', newValue);
    }

    updateQueueName(newValue) {
        this.setState({ queueName: newValue });
        this.props.settings.set('queueName', newValue);
    }

    updateSize(newValue) {
        this.setState({ size: newValue });
        this.props.settings.set('size', newValue);
    }
}
import React, { Component } from 'react';

class SqlSettings extends Component {
    constructor(props) {
        super(props);
        if (!props.settings.get('componentName')) {
            props.settings.set('componentName', '');
        }
    }

    render() {
        return (
            <div class="card border-info mb-3">
                <div className="card-header">SQL Settings</div>
                <div className="card-body text-left">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Component Name:</label>
                        <input
                            type="text"
                            onBlur={e => { this.props.setProperty('componentName', e.target.value) }}
                            className="form-control"
                            placeholder="Give your component a name."
                            value={this.props.settings.get('componentName')}
                        />
                    </div>
                </div>
            </div>);
    }
}

export default SqlSettings;
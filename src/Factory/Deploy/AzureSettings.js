import React, { Component } from 'react';

export default class AzureSettings extends Component {
    constructor() {
        super();
        this.state = {
            subscriptionId: null,
            tenantId: null,
            clientId: null,
            clientSecret: null,
        }
    }

    render() {
        return (
            <div>
                <div>
                    <label>Subscription ID:</label>
                    <input
                        type="text"
                        onChange={e => this.props.settings.set('subscriptionId', e.target.value)}
                        className="form-control"
                        placeholder="E.g. 9a4fe1a5-274e-4c67-8321-8a55ec1ea61"
                        value={this.props.settings.get('subscriptionId')} />
                </div>
                <div>
                    <label>Tenant ID:</label>
                    <input
                        type="text"
                        onChange={e => this.props.settings.set('tenantId', e.target.value)}
                        className="form-control"
                        placeholder="E.g. bafa704d-560b-4ee8-9563-c265cae5ffe2"
                        value={this.props.settings.get('tenantId')} />
                </div>
                <div>
                    <label>Client ID:</label>
                    <input
                        type="text"
                        onChange={e => this.props.settings.set('clientId', e.target.value)}
                        className="form-control"
                        placeholder="E.g. 7ffb12bc-357e-46e5-83e2-7231372561a4"
                        value={this.props.settings.get('clientId')} />
                </div>
                <div className="form-group">
                    <label>Client Secret:</label>
                    <input
                        type="text"
                        onChange={e => this.props.settings.set('clientSecret', e.target.value)}
                        className="form-control"
                        placeholder="E.g. ){BQ6{h>?-a567OG#))Y-n5V!|[b(^&"
                        value={this.props.settings.get('clientSecret')} />
                </div>
            </div>
        )
    }
}
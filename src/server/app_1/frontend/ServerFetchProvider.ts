import * as React from 'react'
import * as Promise from 'bluebird'

interface Props {
    children?: any
    promises: Array<Promise<any>>
}

class ServerFetchProvider extends React.Component<Props, {}> {
    static childContextTypes = {
        serverFetchPromises: React.PropTypes.array,
    };

    getChildContext() {
        return {
            serverFetchPromises: this.props.promises,
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

export default ServerFetchProvider

import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        return (
            <div>{this.props.message}</div>
        )
    }
}

export default ErrorMessage; // Don’t forget to use export default!
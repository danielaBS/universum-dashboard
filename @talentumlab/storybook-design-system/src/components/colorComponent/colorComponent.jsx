import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './colorComponent.module.css'
class Colors extends Component {


    render() {
        return <div className={this.props.colorBg ? this.props.colorBg + " color" : "primary color"}>
            {this.props.title}
            <br />
            {this.props.subtitle}
        </div>
    }
}

export default Colors; // Don’t forget to use export default!

Colors.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    colorBg: PropTypes.oneOf([
        'primary', 'secundary',
        'primary-1', 'secundary-1',
        'primary-2', 'primary-3', 'primary-4', 'primary-5', 'primary-6',
        'secundary-1-1', 'secundary-1-2', 'secundary-1-3',
        'secundary-2-1', 'secundary-2-2', 'secundary-2-3',
        'secundary-3-1', 'secundary-3-2', 'secundary-3-3',
        'secundary-4-1', 'secundary-4-2', 'secundary-4-3',
        'secundary-5-1', 'secundary-5-2', 'secundary-5-3',
        'secundary-6-1', 'secundary-6-2', 'secundary-6-3']),
};



Colors.defaultProps = {
    colorBg: 'primary',
    title: 'Color Primario',
    subtitle: '#32779D',
};
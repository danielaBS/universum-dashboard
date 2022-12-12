import React, { Component } from 'react';
import './typographic.module.css'

class Typographic extends Component {
    render() {
        return (
            <div>
                <h2>Tipografia</h2>
                <div className="flex-dir">
                    <div className="regular">regular: Gris DTI 2_3 #CFF4FF</div>
                    <div className="medium">medium: Gris DTI 2_3 #CFF4FF</div>
                    <div className="semibold">semibold: Gris DTI 2_3 #CFF4FF</div>
                    <div className="bold">bold: Gris DTI 2_3 #CFF4FF</div>
                    <div className="extrabold">extrabold: Gris DTI 2_3 #CFF4FF</div>
                    <div className="black">black: Gris DTI 2_3 #CFF4FF</div>
                </div>
                <h2>Encabezados</h2>
                <div className="flex-lists">
                    <h1>Nivel h1</h1>
                    <h2>Nivel h2</h2>
                    <h3>Nivel h3</h3>
                    <h4>Nivel h4</h4>
                    <h5>Nivel h5</h5>
                    <h6>Nivel h6</h6>
                </div>
            </div>
        )
    }
}

export default Typographic; // Don’t forget to use export default!
import React, { Component } from 'react';
import './listColorDTI.module.css'
import ColorsComponent from '../colorComponent/colorComponent';

class ColorDTI extends Component {
    render() {
        return (
            <div className="center">
                <h2>ColorsComponent</h2>
                <h3>Primary ColorsComponent</h3>
                <div className="flex">
                    <ColorsComponent title="Azul DTI 1" subtitle="#32779D" colorBg="primary"></ColorsComponent>
                    <ColorsComponent title="Azul DTI 2" subtitle="#0670B0" colorBg="primary-2"></ColorsComponent>
                    <ColorsComponent title="Azul DTI 3" subtitle="#13007C" colorBg="primary-3"></ColorsComponent>
                    <ColorsComponent title="Azul DTI 4" subtitle="#0E3192" colorBg="primary-4"></ColorsComponent>
                    <ColorsComponent title="Gris DTI 1" subtitle="#ADADAD" colorBg="primary-5"></ColorsComponent>
                    <ColorsComponent title="Gris DTI 2" subtitle="#89A0AC" colorBg="primary-6"></ColorsComponent>
                </div>
                <h3>Secundary ColorsComponent</h3>
                <div className="flex dir">
                    <h4 className="margin-0">Primary 1</h4>
                    <ColorsComponent title="Azul DTI 1" subtitle="#32779D" colorBg="primary-1"></ColorsComponent>
                    <h4 className="margin-0">Secundary 1</h4>
                    <div className="flex">
                        <ColorsComponent title="Azul DTI 1_1" subtitle="#2C6882" colorBg="secundary-1-1"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 1_2" subtitle="#1D424F" colorBg="secundary-1-2"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 1_3" subtitle="#132C33" colorBg="secundary-1-3"></ColorsComponent>
                    </div>
                </div>
                <div className="flex dir">
                    <h4 className="margin-0">Primary 2</h4>
                    <ColorsComponent title="Azul DTI 2" subtitle="#0670B0" colorBg="primary-2"></ColorsComponent>
                    <h4 className="margin-0">Secundary 2</h4>
                    <div className="flex">
                        <ColorsComponent title="Azul DTI 2_1" subtitle="#0A8BCC" colorBg="secundary-2-1"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 2_2" subtitle="#11B0EF" colorBg="secundary-2-2"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 2_3" subtitle="#00C3FF" colorBg="secundary-2-3"></ColorsComponent>
                    </div>
                </div>
                <div className="flex dir">
                    <h4 className="margin-0">Primary 3</h4>
                    <ColorsComponent title="Azul DTI 3" subtitle="#13007C" colorBg="primary-3"></ColorsComponent>
                    <h4 className="margin-0">Secundary 3</h4>
                    <div className="flex">
                        <ColorsComponent title="Azul DTI 3_1" subtitle="#1302AF" colorBg="secundary-3-1"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 3_2" subtitle="#0D03D8" colorBg="secundary-3-2"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 3_3" subtitle="#0000FF" colorBg="secundary-3-3"></ColorsComponent>
                    </div>
                </div>
                <div className="flex dir">
                    <h4 className="margin-0">Primary 4</h4>
                    <ColorsComponent title="Azul DTI 4" subtitle="#0E3192" colorBg="primary-4"></ColorsComponent>
                    <h4 className="margin-0">Secundary 4</h4>
                    <div className="flex">
                        <ColorsComponent title="Azul DTI 4_1" subtitle="#103077" colorBg="secundary-4-1"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 4_2" subtitle="#0D2754" colorBg="secundary-4-2"></ColorsComponent>
                        <ColorsComponent title="Azul DTI 4_3" subtitle="#091C38" colorBg="secundary-4-3"></ColorsComponent>
                    </div>
                </div>
                <div className="flex dir">
                    <h4 className="margin-0">Primary 5</h4>
                    <ColorsComponent title="Gris DTI 1" subtitle="#ADADAD" colorBg="primary-5"></ColorsComponent>
                    <h4 className="margin-0">Secundary 5</h4>
                    <div className="flex">
                        <ColorsComponent title="Gris DTI 1_1" subtitle="#828282" colorBg="secundary-5-1"></ColorsComponent>
                        <ColorsComponent title="Gris DTI 1_2" subtitle="#636363" colorBg="secundary-5-2"></ColorsComponent>
                        <ColorsComponent title="Gris DTI 1_3" subtitle="#494949" colorBg="secundary-5-3"></ColorsComponent>
                    </div>
                </div>
                <div className="flex dir">
                    <h4 className="margin-0">Primary 6</h4>
                    <ColorsComponent title="Gris DTI 2" subtitle="#89A0AC" colorBg="primary-6"></ColorsComponent>
                    <h4 className="margin-0">Secundary 6</h4>
                    <div className="flex">
                        <ColorsComponent title="Gris DTI 2_1" subtitle="#9EBAC6" colorBg="secundary-6-1"></ColorsComponent>
                        <ColorsComponent title="Gris DTI 2_2" subtitle="#BAD7E2" colorBg="secundary-6-2"></ColorsComponent>
                        <ColorsComponent title="Gris DTI 2_3" subtitle="#CFF4FF" colorDt="black" colorBg="secundary-6-3"></ColorsComponent>
                    </div>
                </div>
            </div>
        )
    }
}

export default ColorDTI; // Don’t forget to use export default!
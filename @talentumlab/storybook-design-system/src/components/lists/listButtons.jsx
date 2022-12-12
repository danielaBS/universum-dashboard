import React, { Component } from 'react';
import ButtonComponent from '../buttonComponent/buttonComponent';

class ListButtons extends Component {
    render() {
        return (
            <div className="center">
                <h1>Buttons</h1>
                <div>
                    <span>Text Type</span>
                    <div className="flex listbuttons">
                        <ButtonComponent text="BUSCAR"></ButtonComponent>
                        <ButtonComponent text="HOVERED"></ButtonComponent>
                        <ButtonComponent image width='50%' text="FOCUSED"></ButtonComponent>
                        <ButtonComponent text="PRESSED"></ButtonComponent>
                        <ButtonComponent text="DRAGGED"></ButtonComponent>
                        <ButtonComponent text="DISABLED" disabled></ButtonComponent>
                    </div>
                    <span>Outlined Type</span>
                    <div className="flex listbuttons">
                        <ButtonComponent type="outlined" text="ENABLED"></ButtonComponent>
                        <ButtonComponent image width='50%' type="outlined" text="HOVERED"></ButtonComponent>
                        <ButtonComponent type="outlined" text="FOCUSED"></ButtonComponent>
                        <ButtonComponent image width='50%' type="outlined" text="PRESSED"></ButtonComponent>
                        <ButtonComponent image width='50%' type="outlined" text="DISABLED" disabled></ButtonComponent>
                        <ButtonComponent type="outlined" text="DISABLED" disabled></ButtonComponent>
                    </div>
                    <span>Contained Type</span>
                    <div className="flex listbuttons">
                        <ButtonComponent type="contained" text="ENABLED"></ButtonComponent>
                        <ButtonComponent type="contained" text="HOVERED"></ButtonComponent>
                        <ButtonComponent type="contained" text="FOCUSED"></ButtonComponent>
                        <ButtonComponent image width='50%'  type="contained" text="PRESSED"></ButtonComponent>
                        <ButtonComponent type="contained" text="DRAGGED"></ButtonComponent>
                        <ButtonComponent image width='50%'  type="contained" text="DISABLED" disabled></ButtonComponent>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListButtons; // Don’t forget to use export default!
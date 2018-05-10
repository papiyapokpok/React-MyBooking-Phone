import React, { Component } from 'react';

import './StyleMainMenu.css'

export default class MainMenuBox extends Component {
    render() {

        const { ...menu } = this.props

        return( 
            <div className="menuDivMain">
                <p {...menu} >{this.props.title }</p>
            </div>
        )
    }
}
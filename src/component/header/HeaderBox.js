import React, { Component } from 'react';

import './StyleHeader.css';

export default class HeaderBox extends Component {
    render() {

        const { ...res } = this.props

        return(
            <div className="logoDiv">
                <img className="logo" id="logo" alt="logo" src={this.props.image} />
            </div>
        )
    }
}
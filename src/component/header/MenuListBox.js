import React, { Component } from 'react';

import './StyleHeader.css';

export default class MenuListBox extends Component {
    render() {
        const { ...res } = this.props
        return(
            <div>
                <img {...res} className="menuList" id="menuList" alt="menuList" src={this.props.image} ></img>
            </div>
        )
    }
}
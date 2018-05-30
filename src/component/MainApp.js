import React, { Component } from 'react'
import HeaderCom from './header/HeaderCom'
import MenuListCom from './header/MenuListCom'
import MyMenuCom from './menu/MyMenuCom'

export default class MainApp extends Component {
    render() {
        return (
            <div>
                <HeaderCom {...this.props}/>
                {this.props.children}  
            </div>
        )
    }
}
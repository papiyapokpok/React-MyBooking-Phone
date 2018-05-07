import React, { Component } from 'react'
import HeaderCom from './header/HeaderCom'
import MenuListCom from './header/MenuListCom'

export default class MainApp extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <HeaderCom {...this.props}/>
                {this.props.children}                
            </div>
        )
    }
}
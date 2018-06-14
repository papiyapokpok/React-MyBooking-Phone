import React, { Component } from 'react'
import HeaderCom from './header/HeaderCom'

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
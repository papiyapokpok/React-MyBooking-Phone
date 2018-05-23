import React, { Component } from 'react'

export default class ButtonLoginBox extends Component {
    render() {

        const { ...button } = this.props
        return(
            <div>
                <button {...button} >{this.props.title}</button>
            </div>
        )
    }
}
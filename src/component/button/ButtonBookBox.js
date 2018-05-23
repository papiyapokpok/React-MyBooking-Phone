import React, { Component } from 'react'

export default class ButtonBookBox extends Component {
    render() {
        const { ...buttonBook } = this.props
        return(
            <div>
                <button {...buttonBook}>{this.props.title}</button>
            </div>
        )
    }
}
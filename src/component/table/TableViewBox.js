import React, { Component } from 'react'

export default class TableViewBox extends Component {
    render() {
        const { ...table } = this.props
        return(

            <tr>
                <th>{this.title}</th>
            </tr>
        )
    }
}
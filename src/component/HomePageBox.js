import React, { Component } from 'react'
import './StyleHome.css'

export default class HomePageBox extends Component {
    render() {
        const { ...res } = this.props
        return(
            <div>

                    <div className="">
                    <label className="label"><b>{this.props.title}</b></label>
                        <input {...res} /> 
                        <br />
                    </div>

            </div>
        )
    }
}
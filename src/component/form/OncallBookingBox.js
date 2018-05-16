import React, { Component } from 'react'

export default class OncallBookingBox extends Component {
    render() {
        const { ...oncallbook } = this.props
        return(
            <div>
                <label className="container">{this.props.label}
                    <input {...this.props}/>
                    <span className="checkmark"></span>
                </label>
            </div>
        )
    }
}
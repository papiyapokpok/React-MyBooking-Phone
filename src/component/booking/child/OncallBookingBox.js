import React, { Component } from 'react'

import '../style/BookingStyle.css'
import '../../main_style/react_dates_overrides.css'

export default class OncallBookingBox extends Component {
    render() {
        const { ...oncallbook } = this.props
        return(
            <div className={'box-div-main'}>
                <label className="container">{this.props.label}
                    <input {...this.props}></input><p className={`pStatus`}>{this.props.text}</p>
                    <span style={this.props.style} className="checkmark" ></span>
                </label>
            </div>
        )
    }
}
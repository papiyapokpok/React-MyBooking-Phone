import React, { Component } from 'react'

import '../style/BookingStyle.css'
import '../../main_style/react_dates_overrides.css'

export default class OncallBookingBox extends Component {
    render() {
        const { ...oncallbook } = this.props
        return(
            <div className={''}>
                <label className="OncallNum">{this.props.label}
                    <input {...this.props} style={{marginLeft: '16px'}}></input>
                    <span style={this.props.style} className="checkmark" ></span>
                </label>
            </div>
        )
    }
}
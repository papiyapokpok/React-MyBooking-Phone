import React, { Component } from 'react'

import '../style/BookingStyle.css'
import '../../main_style/react_dates_overrides.css'

export default class OncallBookingBox extends Component {
    render() {
        const { ...oncallbook } = this.props
        return(
            <div className={'box-div-main'}>
                <label className="container">{this.props.label}
                    <input {...this.props}/>
                    <span className="checkmark"></span>
                </label>
            </div>
        )
    }
}
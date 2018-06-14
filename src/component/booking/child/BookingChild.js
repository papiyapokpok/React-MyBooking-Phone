import React, { Component } from 'react'

import OncallBookingBox from '../child/OncallBookingBox'
import ButtonBookBox from '../../button/ButtonBookBox'
import '../style/BookingStyle.css'
import '../../main_style/react_dates_overrides.css'

export default class BookingChild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { startDate, endDate, status, AlertNulls, defaultAlert, load, toDay } = this.props

        let AlertNullMessage = ''
        let classHide = ''
        let loading = ''

        if(load) {
            loading = <p className={'loadingStyle'} >Now loading...</p>
        }
        
        // if(AlertNulls) {
        //     AlertNullMessage = <AlertNull title={defaultAlert} clickClose={this.clickClose} />
        // }
        return(
            <div className={'Book-div-main'}><br />
                <h3 className={'StaffName'}>Hi, {this.props.getCookie('staff_name').split('@kaidee.com')}</h3>
                <p>Today&nbsp;{this.props.toDay.format('DD-MM-YYYY')}</p>
                <div className={'div-content'}>
                    <OncallBookingBox label={'HTC Eye One'} type="radio" id="oncall1" name="oncall" onClick={()=>{this.props.onCall(1)}}/>
                    <OncallBookingBox label={'Samsung A7'} type="radio" id="oncall2" name="oncall" onClick={()=>{this.props.onCall(2)}}/>
                    <ButtonBookBox className="bookButton" onClick={this.props.onCallBooking} title={'Book Now'}/>                    
                </div> 
            </div>
        )
    }
}
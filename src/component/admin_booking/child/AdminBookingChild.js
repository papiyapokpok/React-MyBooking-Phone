import React, { Component } from 'react'

import BookingBox from '../../booking/child/BookingBox'
import AlertNull from '../../dialog/AlertNull'
import ButtonBookBox from '../../button/ButtonBookBox'
import '../style/AdminBookingStyle.css'
import '../../main_style/react_dates_overrides.css'

import { SingleDatePicker } from 'react-dates';
import '../../main_style/react_dates_overrides.css'

import 'react-dates/initialize'

export default class AdminBookingChild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { load, AlertNulls, defaultAlert, date, focusedInput } = this.props

        let loading = ''
        let AlertNullMessage = ''
        let classHide = '';

        if(load) {
            loading = <h2 className={'loadingStyle'}>Now loading...</h2>
        }

        if(AlertNulls) {
            AlertNullMessage = <AlertNull title={defaultAlert} clickClose={this.clickClose} />
        }

        return(
            <div className={'adBook-div-main'}>
                {loading}
                <div style={{marginTop:'20px', textAlign:'center', width:'350px'}}>
                    <input className={'inputEmail'} type={'text'} value={this.setState.email} onChange={this.props.handleChange} placeholder={'Input email for booking'} ></input>
                <br />
                <br />
                    <br />
                    <BookingBox className={`AdOncallNum`} label={'HTC Eye One'} type="radio" id="oncall1" name="oncall" onClick={()=>{this.props.onCall(1)}}/>
                    <BookingBox className={`AdOncallNum`} label={'Samsung A7'} type="radio" id="oncall2" name="oncall" onClick={()=>{this.props.onCall(2)}}/>
                    <ButtonBookBox className="bookButton" onClick={this.props.adminOnCallBooking} title={'Book Now'}/>                    
                </div> 

                <div style={{textAlign:'-webkit-center'}}>
                    <div style={{textAlign: '-webkit-center'}}>
                        <div style={{marginTop:'30px'}}>
                            {AlertNullMessage}
                        </div>
                    </div>
                </div>                                
            </div>
        )
    }
}
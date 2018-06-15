import React, { Component } from 'react'
import green from '../../assets/imgs/green.png'

import OncallBookingBox from '../child/OncallBookingBox'
import ButtonBookBox from '../../button/ButtonBookBox'
import '../style/BookingStyle.css'
import '../../main_style/react_dates_overrides.css'

export default class BookingChild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { startDate, endDate, status, AlertNulls, defaultAlert, load, toDay, data } = this.props

        let AlertNullMessage = ''
        let classHide = ''
        let loading = ''

        if(load) {
            loading = <p className={'loadingStyle'} >Now loading...</p>
        }

        let dataValue = '';
        let rowCount = 'Total: 0';
        let user1 = <div className={``}><p>No Booking!</p></div>
        let user2 = <div><p>No Booking!</p></div>

        if (data) {
            const result1 = data.filter(e => parseInt(e.oncallnumber) === 1)[0]
            const result2 = data.filter(e => parseInt(e.oncallnumber) === 2)[0]
            if(result1) {
                user1 = (
                    <div>
                        <img src={green} className={'greenLight'}/>
                        <p >{'<- '}Booked {result1.name}</p>
                    </div>
                ); 
            }

            if(result2) {
                user2 = (
                    <div>
                        <img src={green} className={'greenLight'}/>
                        <p >{'<- '}Booked {result2.name}</p>
                    </div>
                ); 
            }   
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
                    <div className={'user1Booking'}>
                        {user1}
                    </div>
                    <OncallBookingBox label={'Samsung A7'} type="radio" id="oncall2" name="oncall" onClick={()=>{this.props.onCall(2)}}/>
                    <div className={'user2Booking'}>
                        {user2}
                    </div>
                    <ButtonBookBox className="bookButton" onClick={this.props.onCallBooking} title={'Book Now'}/>                    
                </div> 

            </div>
        )
    }
}
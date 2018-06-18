import React, { Component } from 'react'
import red from '../../assets/imgs/red.png'

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
        // let user1 = <div className={``}><p>No Booking!</p></div>
        // let user2 = <div><p>No Booking!</p></div>

        // if (data) {
        //     const result1 = data.filter(e => parseInt(e.oncallnumber) === 1)[0]
        //     const result2 = data.filter(e => parseInt(e.oncallnumber) === 2)[0]
        //     if(result1) {
        //         user1 = (
        //             <div>
        //                 <img src={red} className={'greenLight'}/>
        //                 <p >{'<- '}{result1.name}</p>
        //             </div>
        //         ); 
        //     }

        //     if(result2) {
        //         user2 = (
        //             <div>
        //                 <img src={red} className={'greenLight'}/>
        //                 <p >{'<- '}{result2.name}</p>
        //             </div>
        //         ); 
        //     }   
        // } 

        let user1 = <div>
                        <OncallBookingBox 
                            label={'HTC Design'} 
                            text={`No booking`}
                            type="radio" 
                            id="oncall1" 
                            name="oncall" 
                            onClick={()=>{this.props.onCall(1)}}
                        />
                    </div>

        let user2 = <div>
                        <OncallBookingBox 
                            label={'Samsung A7'} 
                            text={`No booking`}
                            type="radio" 
                            id="oncall2" 
                            name="oncall" 
                            onClick={()=>{this.props.onCall(2)}}
                        />
                    </div>

        if (data) {
            const result1 = data.filter(e => parseInt(e.oncallnumber) === 1)[0]
            const result2 = data.filter(e => parseInt(e.oncallnumber) === 2)[0]
            if(result1) {
                user1 = (
                    <div >
                        <OncallBookingBox 
                            readonly
                            label={'HTC Design'}
                            text={'<- '+ result1.name}
                            type="radio" 
                            id="oncall1" 
                            name="oncall" 
                            style={{backgroundColor:'red'}}
                            onClick={()=>{this.props.onCall(1)}}
                        />
                        <p ></p>
                    </div>
                ); 
            }

            if(result2) {
                user2 = (
                    <div>
                        <OncallBookingBox 
                            label={'Samsung A7'}
                            text={'<- '+ result2.name}
                            type="radio" 
                            id="oncall2" 
                            name="oncall" 
                            style={{backgroundColor:'red'}}
                            onClick={()=>{this.props.onCall(2)}}
                        />
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
                <h4>Today&nbsp;{this.props.toDay.format('DD-MM-YYYY')}</h4>
                <div className={'div-content'}>
                        {user1}
                        <br />
                        {user2}
                    <ButtonBookBox 
                        className="bookButton" 
                        onClick={this.props.onCallBooking} 
                        title={'Book Now'}
                    />                    
                </div> 

            </div>
        )

        // return(
        //     <div className={'Book-div-main'}><br />
        //         <h3 className={'StaffName'}>Hi, {this.props.getCookie('staff_name').split('@kaidee.com')}</h3>
        //         <p>Today&nbsp;{this.props.toDay.format('DD-MM-YYYY')}</p>
        //         <div className={'div-content'}>
        //             <OncallBookingBox 
        //                 label={'HTC Eye One'} 
        //                 type="radio" 
        //                 id="oncall1" 
        //                 name="oncall" 
        //                 onClick={()=>{this.props.onCall(1)}}
        //             />
        //             <div className={'user1Booking'}>
        //                 {user1}
        //             </div>
        //             <OncallBookingBox 
        //                 label={'Samsung A7'} 
        //                 type="radio" 
        //                 id="oncall2" 
        //                 name="oncall" 
        //                 onClick={()=>{this.props.onCall(2)}}
        //             />
        //             <div className={'user2Booking'}>
        //                 {user2}
        //             </div>
        //             <ButtonBookBox 
        //                 className="bookButton" 
        //                 onClick={this.props.onCallBooking} 
        //                 title={'Book Now'}
        //             />                    
        //         </div> 

        //     </div>
        // )



    }
}
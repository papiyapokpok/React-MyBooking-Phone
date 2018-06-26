import React, { Component } from 'react'
import htc from '../../assets/imgs/htc.png'
import samsung from '../../assets/imgs/samsung.png'

import OncallBookingBox from '../child/OncallBookingBox'
import ButtonBookBox from '../../button/ButtonBookBox'
import '../style/BookingStyle.css'
import '../../main_style/react_dates_overrides.css'
import CancelCom01 from './CancelCom01';
import CancelCom02 from './CancelCom02';

export default class BookingChild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { startDate, endDate, status, AlertNulls, defaultAlert, load, toDay, data } = this.props
        let { cancelView1, cancelView2 } = this.props

        let AlertNullMessage = ''
        let classHide = ''
        let loading = ''

        if(load) {
            loading = <p className={'BookingLoadingStyle'} >Now loading...</p>
        }

        let dataValue = '';
        let rowCount = 'Total: 0';
        let user1 =                     
                <div style={{width:'100%',height:'120px', marginBottom: '8px'}}>
                    <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'left'}}>
                        <img src={htc} className={`htc`}/>
                    </div>
                    <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'right',textAlign: 'left'}}>
                    <br />
                        <OncallBookingBox
                        label={'OnCall-01'}
                        type="radio" 
                        id="oncall1" 
                        name="oncall" 
                        style={{zIndex:'-9'}}
                        onClick={()=>{this.props.onCall(1)}}
                    />
                    <p className={`tel1`}>Tel. 092-260-9029</p>
                    <p className={`heldBy1`}>No Booking</p>
                    </div>
                </div>

        let user2 = 
                <div style={{width:'100%',height:'120px'}}>
                    <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'left'}}>
                        <img src={samsung} className={`htc`}/>
                    </div>
                    <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'right',textAlign: 'left'}}>
                    <br />
                        <OncallBookingBox
                        label={'OnCall-02'}
                        type="radio" 
                        id="oncall1" 
                        name="oncall" 
                        style={{zIndex:'-9'}}
                        onClick={()=>{this.props.onCall(2)}}
                    />
                    <p className={`tel1`}>Tel. 092-272-1133</p>
                    <p className={`heldBy1`}>No Booking</p>
                    </div>
                </div>
        // let cancelView1 = ''
        // let cancelView2 = ''


        if (data) {
            const result1 = data.filter(e => parseInt(e.oncallnumber) === 1)[0]
            const result2 = data.filter(e => parseInt(e.oncallnumber) === 2)[0]
            const user = this.props.getCookie(`emp_name`)
            
            if(result1) {
                user1 = (
                    <div style={{width:'100%',height:'120px', marginBottom: '40px'}}>
                        <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'left'}}>
                             <img src={htc} className={`htc`}/>
                        </div>
                        <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'right',textAlign: 'left'}}>
                        <br />
                            <OncallBookingBox
                            label={'OnCall-01'}
                            type="radio" 
                            id="oncall1" 
                            name="oncall" 
                            style={{backgroundColor:'red'}}
                            onClick={()=>{this.props.onCall(1)}}
                        />
                        <p className={`tel1`}>Tel. 092-260-9029</p>
                        <p className={`heldBy1`}>Held by: {result1.name}</p>
                        </div>
                        <CancelCom01 
                            data={data}
                            cancelBook={this.props.cancelBook}
                        />
                    </div>
                ); 
            }

            if(result2) {
                user2 = (
                    
                    <div style={{width:'100%',height:'120px'}}>
                        <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'left'}}>
                            <img src={samsung} className={`htc`}/>
                        </div>
                        <div style={{width:'50%',height:'120px', backgroundColor:'white',float:'right',textAlign: 'left'}}>
                            <br />
                                <OncallBookingBox
                                label={'OnCall-02'}
                                type="radio" 
                                id="oncall1" 
                                name="oncall" 
                                style={{backgroundColor:'red'}}
                                onClick={()=>{this.props.onCall(2)}}
                            />
                            <p className={`tel1`}>Tel. 092-272-1133</p>
                            <p className={`heldBy1`}>Held by: {result2.name}</p>
                        </div>
                        <CancelCom02 
                            data={data}
                            cancelBook={this.props.cancelBook}
                        />
                    </div>
                ); 
            }   
        }

        return(
            <div style={{textAlign:'-webkit-center'}}>
                            {loading}

                <div className={'Book-div-main'}><br />
                        <p className={'StaffName'} style={{float:'left'}}>Hi, {this.props.getCookie('emp_nickname').split('@kaidee.com')}</p>
                        <p className={'StaffName'} style={{textAlign:'right'}}>{this.props.toDay.format('DD-MM-YYYY')}</p>
                    <div className={'div-content'}>
                            {user1}
                            {user2}
                        <ButtonBookBox 
                            className="bookButton" 
                            onClick={this.props.onCallBooking} 
                            title={'Book Now'}
                        />
                    </div> 
                </div>
            </div>
        )
    }
}
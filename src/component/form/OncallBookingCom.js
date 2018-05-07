import React, { Component } from 'react';
import './react_dates_overrides.css';

import 'react-dates/initialize';
import { DateRangePicker, DateRangePickerWrapper } from 'react-dates';

import request from 'superagent';

import moment, { now } from 'moment';

import swal from 'sweetalert';
import swal2 from 'sweetalert2';

import AlertNull from '../dialog/AlertNull';

export default class OncallBookingCom extends Component {


    constructor(props) {
        super(props);
        this.state = {
            toDay: moment(),
            startDate: moment(),
            endDate: moment(),            
            focusedInput: null,
            onCallNum: null,
            AlertNulls: false,
            defaultAlert: ['Please select oncall number'],

        };
        this.handleSubmit = this.handleSubmit.bind(this);  
      }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.startDate);
        event.preventDefault();
    } 
    
    getCookie = (cname) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }              
        }
        return "";
        // window.location.reload(true); 
        console.log               
    }

    onCallBooking = (e) => {
        e.preventDefault();
        const staff_name = this.getCookie('staff_name')
        const oncallnumber = this.state.onCallNum
        const toDay = this.state.toDay.format('YYYY-MM-DD')
        const payload = {
            staff_name,
            oncallnumber,
            toDay,
        }
        if ( oncallnumber === null) {
            // swal('Please select oncall! ');
            this.setState({
                AlertNulls: true,
            })
            console.log('Null')
            return;
        }
        request
            .post('http://localhost/oncall/bookOncall.php')
            .set('content-type', 'application/json')
            .send(payload)
            .end((err, res) => {
                // console.log(res.body.status)
                if(res.body.status === true){
                    swal({
                        title: "Complete!",
                        text: "You booking oncall done",
                        icon: "success",

                    })
                }
                
                if(res.body.status === false) {
                    swal({
                        title: "Failed!",
                        text: "You cannot booking oncall, please try again",
                        icon: "failed",
                    })
                } 
                
                if(res.body.status === 'checkout') {
                    swal({
                        title: "Failed!",
                        text: "This device has already been reserved.",
                        icon: "warning",
                    })
                }
            }, 'json')
    }

    onCall = (e) => {
        this.state.onCallNum = e
        console.log(this.state.onCallNum)       
    }


    clickClose = () => {
        this.setState({
            AlertNulls: false,
            defaultAlert: ['Please select oncall number'],
        })
    }


    render() {

        // console.log(this.props) 
        const { startDate, endDate, status, AlertNulls, defaultAlert } = this.state
        console.log(this.state.toDay.format('YYYY-MM-DD'))
        let AlertNullMessage = ''
        let classHide = '';
        let toDay = this.state.toDay
        if(AlertNulls) {
            AlertNullMessage = <AlertNull title={defaultAlert} clickClose={this.clickClose} />
        }


        return(
            <div>
                <p>Today {this.state.toDay.format('DD-MM-YYYY')}</p>
                
                <div style={{marginTop:'40px', textAlign:'center'}}>
                
                    <label className="container">HTC Eye One
                        <input type="radio" id="oncall1" name="oncall" onClick={()=>{this.onCall(1)}}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Samsung A7
                        <input type="radio" id="oncall2" name="oncall" onClick={()=>{this.onCall(2)}}/>
                        <span className="checkmark"></span>
                    </label>
                    <div style={{marginTop:'20px'}}>
                        {/* <DateRangePicker
                        orientation="vertical" 
                        verticalHeight={390}
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }) } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0}
                        readOnly={true}  
                        /> */}
                    </div>
                    <div>
                        <button className="bookButton" onClick={this.onCallBooking} >Comfirm</button>
                    </div>

                    <div>
                        <div>
                            <p>{this.setState.status}</p>
                        </div>
                    </div>
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
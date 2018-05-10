import React, { Component } from 'react';
import './react_dates_overrides.css';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import request from 'superagent';
import moment, { now } from 'moment';

import swal from 'sweetalert';
import swal2 from 'sweetalert2';

import AlertNull from '../dialog/AlertNull';

// import MenuLeftCom from '../header/MenuLeftCom'

export default class OncallCom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment().add(1, 'days'),
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

    onCall = (e) => {
        this.state.onCallNum = e
        console.log(this.state.onCallNum)       
    }

    onSubmit = (e) => {
        e.preventDefault();
        const oncallnumber = this.state.onCallNum        
        const { startDate, endDate } = this.state
        const email = this.getCookie('staff_name')
        // var Alert = require('react-s-alert').default;
        console.log(email)

        console.log(oncallnumber)

        if ( oncallnumber === null) {
            // swal('Please select oncall! ');
            this.setState({
                AlertNulls: true,
            })
            console.log('2222222')
            return;
        }

        if ( startDate === null) {
            // swal('Please select date! ');
            this.setState({
                AlertNulls: true,
                defaultAlert: ['Please select start date'], 
            })
            return;
            // window.location.reload();
        } 

        if ( endDate === null) {
            // swal('Please select date! ');
            this.setState({
                AlertNulls: true,
                defaultAlert: ['Please select end date'], 
            })
            return;
            // window.location.reload();
        } 

        var end = moment(endDate).add(1, 'days');
        var start = moment(startDate);
        const dateDiff = end.diff(start, 'days')
        let promiseList = []
        for (let i = 0; i < dateDiff; i++) {
            promiseList.push(new Promise((resolve, reject) => {
                const oncalldate = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
                const payload = {
                    oncallnumber,
                    oncalldate,
                    email,
                }

                request
                    .post('http://172.25.11.98/postData.php')
                    .set('content-type', 'application/json')
                    .send(payload)
                    .end((err, res) => {
                        if(res.body.status === false) {
                            resolve({ status: res.body.status })
                            // const status = ('status: ' + res.body.status) 
                            // console.log(res.body.status)    
                            // alert("Oncall 0" + oncallnumber + " วันที่ " + oncalldate + " " +" มีคนลงทะเบียนไปแล้ว")
                            // this.setState({
                            //     AlertNulls: true,
                            //     defaultAlert: `Oncall 0${oncallnumber}วันที่ ${oncalldate} มีคนลงทะเบียนไปแล้ว`
                            // })
                        } else {
                            resolve({ status: true })
                            // const status = ('status: ' + res.body.status)                                
                            // console.log(status)   
                            // alert("คุณลงทะเบียนถือ Oncall 0" + oncallnumber + " วันที่ " + oncalldate + " เรียบร้อย ")                                                         
                        }
                }, 'json')
                })
            )
        }
        Promise.all(promiseList).then((arrList)=> {
            const list = []
                arrList.forEach((e, i) => {
                if (e.status === false) {
                    const oncalldate = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
                    list.push(`Oncall 0${oncallnumber}วันที่ ${oncalldate} มีคนลงทะเบียนไปแล้ว`)
                } 
                if (e.status === true) {
                    const oncalldate = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
                    list.push(`Oncall 0${oncallnumber}วันที่ ${oncalldate} ลงทะเบียนเรียบร้อย *`)                    
                }
            })
            this.setState({
                AlertNulls: true,
                defaultAlert: list,
            })
        })
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
        // console.log(res.body.status)
        let AlertNullMessage = ''
        let classHide = '';
        
        if(AlertNulls) {
            AlertNullMessage = <AlertNull title={defaultAlert} clickClose={this.clickClose} />
        }
           
        return(
            <div style={{marginTop:'20px', textAlign:'center'}}>
                <label className="container">HTC Eye One
                    <input type="radio" id="oncall1" name="oncall" onClick={()=>{this.onCall(1)}}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Samsung A7
                    <input type="radio" id="oncall2" name="oncall" onClick={()=>{this.onCall(2)}}/>
                    <span className="checkmark"></span>
                </label>
                <div style={{marginTop:'20px'}}>
                    <DateRangePicker orientation="vertical" verticalHeight={390}
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }) } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} />
                </div>
                <div>
                    <button className="oncallButton" onClick={this.onSubmit} >Comfirm</button>
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

                {/* <MenuLeftCom {...this.props}/> */}

            </div>
        )
    }
}

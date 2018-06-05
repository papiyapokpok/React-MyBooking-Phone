import React, { Component } from 'react'

import OncallBookingBox from './OncallBookingBox'
import ButtonBookBox from '../button/ButtonBookBox'
import AlertNull from '../dialog/AlertNull'
import './react_dates_overrides.css';
import './CustomStyle.css'
import firebase from'../../firebase'

// import 'react-dates/initialize';
// import moment, { now } from 'moment';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import swal from 'sweetalert';
import moment, { now } from 'moment';

export default class OncallBookDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            AlertNulls: false,
            defaultAlert: ['Please select oncall number'],   
            date:null,
            email:null ,
            onCallNum: null,
                
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({email: event.target.value});
        console.log(this.state.email)
    }

    adminOnCallBooking = () => {
        const db = firebase.firestore();
        const number = this.state.onCallNum
        const start = new Date(this.state.date)
        start.setHours(0, 0, 0)
        const end = new Date(this.state.date)
        end.setHours(23, 59, 59) 
            if(start, end) {
                db.collection("testLogs") 
                .where('dateTime', '>', start)
                .where('dateTime', '<', end)
                .where('oncallnumber', '==', number)              
                .onSnapshot((querySnapshot) => {
                    var data = [];
                    if(querySnapshot.size > 0) {
                        console.log('Checkout')
                        const numberName = querySnapshot.docs[0].data().oncallnumber
                        const emailName = querySnapshot.docs[0].data().email.split('@kaidee.com'); 
                        // const emailCheckout = emailName.split(',')
                        const oncallCheckout=JSON.stringify(numberName) 
                        // const emailCheckout=JSON.stringify(emailName); 
                        const dateCheckout= moment() .format('Y-MM-DD')

                        if(oncallCheckout == 1) {
                            const textView = ( 'Date: '
                            + '  ' + dateCheckout +'\n'+'\n' 
                            + 'Model:  '
                            + 'HTC Eye One' +'\n'+'\n'
                            + 'Book by: '
                            + emailName)
                            swal({
                                title:'This device has already been reserved.',
                                text: textView,
                                icon: "warning",
                                dangerMode:'true',
                                buttons: 'Done'
                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    this.setState({load: false})
                                }
                            })
                        } else if(oncallCheckout == 2) {
                            const textView = ( 'Date: '
                            + '  ' + dateCheckout +'\n'+'\n' 
                            + 'Model:  '
                            + 'Samsung A7' +'\n'+'\n'
                            + 'Book by: '
                            + emailName)
                            swal({
                                title:'This device has already been reserved.',
                                text: textView,
                                icon: "warning",
                                dangerMode:'true',
                                buttons: 'Done'
                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    this.setState({load: false})
                                }
                            })
                        }
                    } else {
                        console.log('No Checkout')
                        //หาข้อมูล emil ใน Employee
                        const db = firebase.firestore();        
                        const emails = this.state.email         
                        db.collection("employee") 
                        .where('email', '==', emails)                       
                        .onSnapshot((querySnapshot) => {
                        const emailGet = querySnapshot.docs[0].data().email
                        const idGet = querySnapshot.docs[0].data().id
                        const nameGet = querySnapshot.docs[0].data().name
                        const nicknameGet = querySnapshot.docs[0].data().nickname
                        const surnameGet = querySnapshot.docs[0].data().surname
                        // this.setCookie('emp_email', emailGet, 1)
                        // this.setCookie('emp_id', idGet, 1)
                        // this.setCookie('emp_name', nameGet, 1)
                        // this.setCookie('emp_nickname', nicknameGet, 1)
                        // this.setCookie('emp_surname', surnameGet, 1)

                        db.collection("testLogs").add({
                            oncallnumber: number,
                            email: emailGet,
                            id: idGet,
                            name: nameGet,
                            nickname: nicknameGet,
                            surname: surnameGet,
                            dateTime: start
                        })
                        .then((docRef) => {
                            swal({
                                title: 'Complete',
                                text: "You booking oncall done",
                                icon:'success'
                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    this.setState({load: false})
                                }
                            })
                        })
                        .catch((error) => {
                            // console.error("Error adding document: ", error);
                            swal({
                                title: 'Failed',
                                text: "This device has already been reserved.",
                                icon: "warning",
                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    this.setState({load: false})
                                }
                            })
                        });
                            
                        }) 

                    } 
                });
            }
    }

    getEmailEmp = () => {

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
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    onCall = (e) => {
        this.state.onCallNum = e      
    }


    render() {
        const { load, AlertNulls, defaultAlert } = this.state
        // const { loadingStyle } = this.setState

        let loading = ''
        if(load) {
            loading = <h2 style={loadingStyle}>Now loading...</h2>
        }
        let AlertNullMessage = ''
        let classHide = '';
        // let toDay = this.state.toDay
        if(AlertNulls) {
            AlertNullMessage = <AlertNull title={defaultAlert} clickClose={this.clickClose} />
        }
        const inputEmail = {
            textAlign:'center',
            fontSize: '16px',
            width: '80%',
            height: '32px',
            paddingLeft: '8px',
            border: '1px solid gray'
        }
        return(
            <div style={{textAlign:'-webkit-center'}} >
                <br />
                <div style={{textAlign:'-webkit-center'}}>

                    <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={() => false} />
                </div>
                {loading}
                <div style={{marginTop:'20px', textAlign:'center', width:'350px'}}>
                    <input style={inputEmail} type={'text'} value={this.setState.email} onChange={this.handleChange}  ></input>
                <br />
                <br />
                    <br />
                    <OncallBookingBox label={'HTC Eye One'} type="radio" id="oncall1" name="oncall" onClick={()=>{this.onCall(1)}}/>
                    <OncallBookingBox label={'Samsung A7'} type="radio" id="oncall2" name="oncall" onClick={()=>{this.onCall(2)}}/>
                    <ButtonBookBox className="bookButton" onClick={this.adminOnCallBooking} title={'Book Now'}/>                    
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
        const loadingStyle = {
            fontSize: '24px',
            position: 'absolute',
            paddingTop: '20%',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex:'999'
        }
    }
}
import React, { Component } from 'react';
import './react_dates_overrides.css';
import OncallBookingBox from './OncallBookingBox'
import ButtonBookBox from '../button/ButtonBookBox'

import 'react-dates/initialize';
import { DateRangePicker, DateRangePickerWrapper } from 'react-dates';

import request from 'superagent';

import moment, { now } from 'moment';

import swal from 'sweetalert';
import swal2 from 'sweetalert2';

import AlertNull from '../dialog/AlertNull';

import firebase from '../../firebase'

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
            load: false,
            // db: firebase.firestore()

        };
        this.handleSubmit = this.handleSubmit.bind(this);  
    }
//Check cookie
    componentDidMount() {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            this.getDataEmployee()
            this.loginSuccess()
        } else {
            window.location.href = "/"
            // this.props.history.push('/')
        }
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
    }
    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getDataEmployee = () => {
        const db = firebase.firestore();
        const email = this.getCookie('staff_name')
        db.collection("employee") 
            .where('email', '==', email)
            .get()
            .then((querySnapshot) => {
                const emailGet = querySnapshot.docs[0].data().email
                const idGet = querySnapshot.docs[0].data().id
                const nameGet = querySnapshot.docs[0].data().name
                const nicknameGet = querySnapshot.docs[0].data().nickname
                const surnameGet = querySnapshot.docs[0].data().surname

                this.setCookie('emp_email', emailGet, 1)
                this.setCookie('emp_id', idGet, 1)
                this.setCookie('emp_name', nameGet, 1)
                this.setCookie('emp_nickname', nicknameGet, 1)
                this.setCookie('emp_surname', surnameGet, 1)
            })
    }

    onCallBooking = (e) => {
        this.setState({load: true})
        const db = firebase.firestore();

        const email = this.getCookie('emp_email')
        const id = this.getCookie('emp_id')
        const name = this.getCookie('emp_name')
        const nickname = this.getCookie('emp_nickname')
        const surname = this.getCookie('emp_surname')

        const oncallnumber = this.state.onCallNum
        const toDay = new Date()

        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999); 
        if(oncallnumber == null ) {
            swal({
                title:'Cannot booking now!',
                text:'Please select oncall number!',
                icon: "warning",
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.setState({load: false})
                }
            })
        } else {
            db.collection("oncalllogs") 
                .where('dateTime', '>', start)
                .where('dateTime', '<', end)
                .where('oncallnumber', '==', oncallnumber)                
            .get()
            .then((querySnapshot) => {
                
                    if (querySnapshot.size > 0) {                    
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

                        var db = firebase.firestore();
                        db.collection("oncalllogs").add({
                            oncallnumber: oncallnumber,
                            email: email,
                            id: id,
                            name: name,
                            nickname: nickname,
                            surname: surname,
                            dateTime: toDay
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
                    }
            })
            .catch(function(error) {
            });            
        }        
    }

    onCall = (e) => {
        this.state.onCallNum = e      
    }

    clickClose = () => {
        this.setState({
            AlertNulls: false,
            defaultAlert: ['Please select oncall number'],
        })
    }

    loginSuccess = () => {
        this.props.history.push('/home')
    }

    render() {
        const { book, load } = this.state

        const loadingStyle = {
            fontSize: '24px',
            position: 'absolute',
            paddingTop: '20%',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex:'999'
        }
        const { startDate, endDate, status, AlertNulls, defaultAlert } = this.state
        let AlertNullMessage = ''
        let classHide = '';
        let toDay = this.state.toDay
        let loading = ''
        if(load) {
            loading = <p style={loadingStyle}>Now loading...</p>
        }
        
        if(AlertNulls) {
            AlertNullMessage = <AlertNull title={defaultAlert} clickClose={this.clickClose} />
        }
        return(
            <div style={{textAlign:'-webkit-center'}} >
                <p>Today {this.state.toDay.format('DD-MM-YYYY')}</p>  
                {loading}
                <div style={{marginTop:'40px', textAlign:'center', width:'350px'}}>
                    <OncallBookingBox label={'HTC Eye One'} type="radio" id="oncall1" name="oncall" onClick={()=>{this.onCall(1)}}/>
                    <OncallBookingBox label={'Samsung A7'} type="radio" id="oncall2" name="oncall" onClick={()=>{this.onCall(2)}}/>
                    <ButtonBookBox className="bookButton" onClick={this.onCallBooking} title={'Book Now'}/>                    
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
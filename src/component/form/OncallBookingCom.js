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

    onCallBooking = (e) => {
        this.setState({load: true})
        const email = this.getCookie('staff_name')
        const oncallnumber = this.state.onCallNum
        const toDay = new Date()
        var db = firebase.firestore();

        var start = new Date();
        start.setHours(0, 0, 0, 0);
        var end = new Date();
        end.setHours(23, 59, 59, 999); 
        if(oncallnumber == null ) {
            console.log('Failed, please select number')
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
                        // console.log(querySnapshot.docs[0].data())
                        const numberName = querySnapshot.docs[0].data().oncallnumber
                        const emailName = querySnapshot.docs[0].data().email
                        
                        var oncallCheckout=JSON.stringify(numberName) 
                        var emailCheckout=JSON.stringify(emailName) 
                        var dateCheckout= moment() .format('Y-MM-DD')
                        
                        swal({
                            title:'This device has already been reserved.',
                            text: 'Date '+dateCheckout+'\n'+'\n' + 'OnCall Number: 0'+oncallCheckout+'\n'+'\n'+'Book by: '+emailCheckout,
                            icon: "warning",
                            dangerMode:'true',
                            buttons: 'Done'
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                this.setState({load: false})
                            }
                        })
                    } else {

                        var db = firebase.firestore();
                        db.collection("oncalllogs").add({
                            oncallnumber: oncallnumber,
                            email: email,
                            dateTime: toDay
                        })
                        .then((docRef) => {
                            // console.log("Document written with ID: ", docRef.id);
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
                console.log("Error getting documents: ", error);
            });            
        }        
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

    loginSuccess = () => {
        this.props.history.push('/home')
    }

    render() {
        const { book, load } = this.state

        const loadingStyle = {
            position: 'absolute',
            fontSize: '24px',
            zIndex: '999',
            backgroundColor: '#fffffff5',
            height: '100%',
            width: '100%'
        }

        // console.log(this.props) 
        const { startDate, endDate, status, AlertNulls, defaultAlert } = this.state
        console.log(this.state.toDay.format('YYYY-MM-DD'))
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
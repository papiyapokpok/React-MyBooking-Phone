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
        const email = this.getCookie('staff_name')
        const oncallnumber = this.state.onCallNum
        const toDay = new Date()
        var db = firebase.firestore();

        var start = new Date();
        start.setHours(0, 0, 0, 0);
        var end = new Date();
        end.setHours(23, 59, 59, 999); 

        console.log("start", start, "end", end, "num=", oncallnumber)
        
        db.collection("oncalllogs") 
            .where('dateTime', '>', start)
            .where('dateTime', '<', end)
            .where('oncallnumber', '==', oncallnumber)                
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot)
            
            // 
                if (querySnapshot.size > 0) {
                    console.log(querySnapshot.docs[0].data())
                    const numberName = querySnapshot.docs[0].data().oncallnumber
                    const emailName = querySnapshot.docs[0].data().email
                    
                    var oncallCheckout=JSON.stringify(numberName) 
                    var emailCheckout=JSON.stringify(emailName) 
                    
                    swal({
                        title:'This device has already been reserved.',
                        text: 'OnCall Number: 0'+oncallCheckout+'\n'+'\n'+'Book by: '+emailCheckout,
                        icon: "warning"
                    })
                } else {
                    // console.log('No Data')
                    this.writeUserData(oncallnumber, email, toDay)
                }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }



    writeUserData(oncallnumber, email, toDay) {
        // var db = firebase.firestore();
        this.db.collection("oncalllogs").add({
            oncallnumber: oncallnumber,
            email: email,
            dateTime: toDay
        })
        .then(function(docRef) {
            // console.log("Document written with ID: ", docRef.id);
            swal({
                title: 'Complete',
                text: "You booking oncall done",
                icon:'success'
            })
        })
        .catch(function(error) {
            // console.error("Error adding document: ", error);
            swal({
                title: 'Failed',
                text: "This device has already been reserved.",
                icon:'failed'
            })
        });
      }


    // onCallBooking = (e) => {
    //     e.preventDefault();
    //     console.log('kakakakakakak')
    //     const staff_name = this.getCookie('staff_name')
    //     const oncallnumber = this.state.onCallNum
    //     const toDay = this.state.toDay.format('YYYY-MM-DD')
    //     const payload = {
    //         staff_name,
    //         oncallnumber,
    //         toDay,
    //     }
    //     if ( oncallnumber === null) {
    //         // swal('Please select oncall! ');
    //         this.setState({
    //             AlertNulls: true,
    //         })
    //         console.log('Null')
    //         return;
    //     }
    //     request
    //         .post('http://172.25.11.98/oncall/bookOncall.php')
    //         .set('content-type', 'application/json')
    //         .send(payload)
    //         .end((err, res) => {
    //             // console.log(res.body.status)
    //             if(res.body.status === true){
    //                 swal({
    //                     title: "Complete!",
    //                     text: "You booking oncall done",
    //                     icon: "success",

    //                 })
    //             }
                
    //             if(res.body.status === false) {
    //                 swal({
    //                     title: "Failed!",
    //                     text: "You cannot booking oncall, please try again",
    //                     icon: "failed",
    //                 })
    //             } 
                
    //             if(res.body.status === 'checkout') {
    //                 swal({
    //                     title: "Failed!",
    //                     text: "This device has already been reserved.",
    //                     icon: "warning",
    //                 })
    //             }
    //         }, 'json')
    // }

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
        this.props.history.push('/menu')
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
                    <OncallBookingBox label={'HTC Eye One'} type="radio" id="oncall1" name="oncall" onClick={()=>{this.onCall(1)}}/>
                    <OncallBookingBox label={'Samsung A7'} type="radio" id="oncall2" name="oncall" onClick={()=>{this.onCall(2)}}/>
                    <ButtonBookBox className="bookButton" onClick={this.onCallBooking} title={'Book Now'}/>
                    
                </div> 

                <div>
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
import React, { Component } from 'react'

import AdminBookingChild from './child/AdminBookingChild'

import swal from 'sweetalert';
import moment, { now } from 'moment';

import { SingleDatePicker } from 'react-dates';

import firebase from '../../firebase'

export default class AdminBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            AlertNulls: false,
            defaultAlert: ['Please select oncall number'],   
            date: null,
            email: 'sretthakan.t@kaidee.com' ,
            onCallNum: null,
            focusedInput: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    onCall = (e) => {
        this.state.onCallNum = e      
    }

    adminOnCallBooking = () => {
        const db = firebase.firestore();
        const email = this.state.email
        const date = this.state.date
        const number = this.state.onCallNum
        const start = new Date(this.state.date)
        start.setHours(0, 0, 0, 0)
        const end = new Date(this.state.date)
        end.setHours(23, 59, 59, 999) 
            if(start, end) {
                // db.collection("oncalllogs") 
                db.collection("testLogs")                 
                .where('dateTime', '>=', start)
                .where('dateTime', '<=', end)
                .where('oncallnumber', '==', number) 
                .onSnapshot((querySnapshot) => {
                    console.log(querySnapshot.size)
                    var data = [];

                if(querySnapshot.size > 0) {
                    console.log('Checkout')
                    const numberName = querySnapshot.docs[0].data().oncallnumber
                    const emailName = querySnapshot.docs[0].data().email.split('@kaidee.com'); 
                    const oncallCheckout=JSON.stringify(numberName) 
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
                        // db.collection("oncalllogs").add({
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

    onCall = (e) => {
        this.state.onCallNum = e      
    }

    render() {
        return(
            <div>
                <br />
                <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
                numberOfMonths={1}
                isOutsideRange={() => false} />

                <AdminBookingChild 
                    {...this.state}
                    onCall={this.onCall}
                    adminOnCallBooking={this.adminOnCallBooking}
                    handleChange={this.handleChange}
                    setDateTime={this.setDateTime}
                    setFocusState={this.setFocusState}
                />

            </div>   
        )
    }
}
import React, { Component } from 'react'

import BookingChild from './child/BookingChild'

import firebase from '../../firebase'

import moment, { now } from 'moment';
import swal from 'sweetalert';

import slackPost from '../../config/SlackChat'
import SlackChat from '../../config/SlackChat';

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDay: moment(),
            startDate: null,
            endDate: null,            
            focusedInput: null,
            onCallNum: null,
            load: false,
            data:false,
            defaultAlert: ['Please select oncall number'],
        };
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    slackPost = () => {
        const nickname = this.getCookie('emp_nickname')
        const num = this.state.onCallNum
        const date = this.state.toDay
        SlackChat.slackPost(nickname, num, date)
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.startDate);
        event.preventDefault();
    } 

    componentDidMount() {
        this.setState({load: true})
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            
            this.getDataEmployee()
            this.getToday()
        } else {
            window.location.href = "/"
            // this.props.history.push('/')
        }
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

            this.setCookie('emp_email', emailGet, 30)
            this.setCookie('emp_id', idGet, 30)
            this.setCookie('emp_name', nameGet, 30)
            this.setCookie('emp_nickname', nicknameGet, 30)
            this.setCookie('emp_surname', surnameGet, 30)
        })
    }

    getToday = () => {
        this.setState({load: true})

        const db = firebase.firestore();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999); 

        db.collection("oncalllogs") 
        .where('dateTime', '>=', start)
        .where('dateTime', '<=', end)
        // .where('oncallnumber', '==', oncallnumber)                
    .get()
    .then((querySnapshot) => {
        const data = [];        
            if(querySnapshot.size > 0) {
                querySnapshot.forEach((querySnapshot) => {
                    // data.push(querySnapshot.data())
                    data.push(Object.assign(querySnapshot.data(), { id: querySnapshot.id })) //Merge Object
                });
                this.setState({
                    data,
                })
                this.setState({load: false})
            } else {
                // swal('No booking on search')
                // this.setState({load: false})                
            } 
        })
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <div>
                    <p >{e.oncallnumber}</p>
                    <p >{e.name}</p>
                </div>
            );
        })    
    }

    onCall = (e) => {
        this.state.onCallNum = e  
        console.log(this.state.onCallNum)    
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
                .where('dateTime', '>=', start)
                .where('dateTime', '<=', end)
                .where('oncallnumber', '==', oncallnumber)                
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot)
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
                        this.setState({load: false})
                        console.log(name)
                        const bookingBy = 
                            ( 
                                'by: ' + ' '
                                + ' ' + name 
                                + ' ' + surname
                            )

                        swal({
                            title:'Are you sure booking!',
                            text: bookingBy,
                            icon: "warning",
                            dangerMode: true,
                            buttons: true
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                this.slackPost()
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
                                        window.location.reload()

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

                            } else {
                              swal("Please logout and login again!");
                            }
                          });
                    }
            })
            .catch(function(error) {
            });            
        }        
    }

    render() {
        return(
            <div>
                <BookingChild 
                    onCall={this.onCall}                
                    {...this.state}
                    onCallBooking={this.onCallBooking}
                    getCookie={this.getCookie}
                    dataRender={this.dataRender}
                    slackPost={this.slackPost}
                />
            </div>
        )
    }
}



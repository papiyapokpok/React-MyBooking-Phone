import React, { Component } from 'react'
import BookingChild from './child/BookingChild'
import firebase from '../../firebase'
import moment, { now } from 'moment'
import swal from 'sweetalert'
import SlackChat from '../../config/SlackChat'
import request from 'superagent'
import { PropTypes } from 'prop-types';

import slackPost from '../../config/SlackChat'
import SlackCancel from '../../config/SlackCancel'

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
            cancels: false,
            cancelView1: false,
            cancelView2: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    static PropType = {
        history: PropTypes.object,
    }

    refresh = () => {
        // this.props.history.push('/booking')
       window.location.reload()
    } 

    slackPost = () => {
        const nickname = this.getCookie('emp_nickname')
        const num = this.state.onCallNum
        const date = this.state.toDay
        SlackChat.slackPost(nickname, num, date)
    }

    // SlackCancel = () => {
    //     const nickname = this.getCookie('emp_nickname')
    //     const num = this.getCookie('num')
    //     const date = this.getCookie('today')
    //     const canC = " `cancel` "
        
    //     const day = moment(date).format('LL');
    //     const nick = nickname

    //     const txt = " *"+"Today "+"* " + " *"+day+"* "+ "\n"+">"+ " *"+nick+"* "+" is "+canC+ " an"+ " *"+"OnCall0"+num+"* " 

    //     const text =
    //         (
    //             `mrkdwn = true`,
    //             `text= ${txt}`        
    //         )
    //     request.post('https://slack.com/api/chat.postMessage')
    //     .set('Content-type', 'application/x-www-form-urlencoded')
    //     .send('token=xoxb-360083493237-384365618711-2icVB5gT7OFa3BCU8MovFpGD')
    //     .send('channel=who-is-oncall')
    //     .send(`${text}`)
    //     .then(e => {
    //         console.log(e)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })
    // }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.startDate);
        event.preventDefault();
    } 

    componentDidMount() {
        // this.setState({load: true})
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
        const day = this.state.toDay.format('LL')
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
            this.setCookie('today', day, 1)
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
                this.setState({load: false})                
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

    // cancelBook = (data) => {
    //     const db = firebase.firestore();
    //     const id = data[0].id
    //     console.log(id)
    //     console.log(data)
    //     swal({
    //         title: "Are you sure?",
    //         text: "Do you want cancel booking today!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //         })
    //     .then((willDelete) => {
    //         if (willDelete) {
    //             this.SlackCancel()
    //             this.setState({load: true})
    //             db.collection('oncalllogs').doc(id).delete().then(function() {
    //                 // console.log("Document successfully deleted!");
    //                 swal("Document successfully deleted!") 
    //                 window.location.reload(true);               
    //             })
    //             .catch(function(error) {
    //                 // console.error("Error removing document: ", error);
    //                 swal("Cancel complete!") 
    //                 window.location.reload(true);               

    //             });
    //             this.setState({load: false})

    //         } else {
    //         // swal("Your imaginary file is safe!");
    //         }
    //     });
    // }

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
                // .where('oncallnumber', '==', oncallnumber)               
                .where('email', '==', email)                
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot)
                    if (querySnapshot.size > 0) {                    
                        const numberName = querySnapshot.docs[0].data().oncallnumber
                        const emailName = querySnapshot.docs[0].data().email.split('@kaidee.com'); 
                        const oncallCheckout=JSON.stringify(numberName) 
                        const dateCheckout= moment() .format('Y-MM-DD')
                        console.log('cannot booking')

                        if(oncallCheckout == 1) {
                            const textView = ( 
                                'OnCall-01, '+'you can only take one at a time'
                            )
                            swal({
                                title:'You already booked',
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
                            const textView = (
                                'OnCall-02, '+'you can only take one at a time'
                            )
                            swal({
                                title:'You already booked',
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
                        // console.log(name)
                        const bookingBy = 
                            ( 
                                'OnCall-0' +
                                + oncallnumber + ' '
                                + 'by: ' + ' '
                                + ' ' + name 
                            )

                        swal({
                            title:'Are you sure?',
                            text: bookingBy,
                            icon: "warning",
                            dangerMode: true,
                            buttons: true
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                this.slackPost()
                                this.setCookie('num', oncallnumber, 1)

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
                            //   swal("Please logout and login again!");
                            this.setState({onCallNum: null})
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
                    cancelBook={this.cancelBook}
                />
            </div>
        )
    }
}



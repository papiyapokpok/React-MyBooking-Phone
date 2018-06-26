import React, { Component } from 'react'
import swal from 'sweetalert'
import firebase from '../../../firebase'
import moment, { now } from 'moment'
import request from 'superagent'

import SlackCancel from '../../../config/SlackCancel'


export default class CancelCom01 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelV: true
        }
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
    cancelBook = (result1) => {
        const db = firebase.firestore();
        const id = result1
        // console.log(id)
        // console.log(result1)
        swal({
            title: "Are you sure?",
            text: "Do you want cancel booking today!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                this.SlackCancel()
                this.setState({load: true})
                db.collection('oncalllogs').doc(id).delete().then(function() {
                    // console.log("Document successfully deleted!");
                    swal("Document successfully deleted!") 
                    window.location.reload(true);               
                })
                .catch(function(error) {
                    // console.error("Error removing document: ", error);
                    swal("Cancel complete!") 
                    window.location.reload(true);               

                });
                this.setState({load: false})

            } else {
            // swal("Your imaginary file is safe!");
            }
        });
    }

    SlackCancel = () => {
        const nickname = this.getCookie('emp_nickname')
        const num = this.getCookie('num')
        const date = this.getCookie('today')
        const canC = " `cancel` "
        
        const day = moment(date).format('LL');
        const nick = nickname

        const txt = " *"+"Today "+"* " + " *"+day+"* "+ "\n"+">"+ " *"+nick+"* "+" is "+canC+ " an"+ " *"+"OnCall0"+num+"* " 

        const text =
            (
                `mrkdwn = true`,
                `text= ${txt}`        
            )
        request.post('https://slack.com/api/chat.postMessage')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send('token=xoxb-360083493237-384365618711-2icVB5gT7OFa3BCU8MovFpGD')
        .send('channel=who-is-oncall')
        .send(`${text}`)
        .then(e => {
            console.log(e)
        })
        .catch(e => {
            console.log(e)
        })
    }

    render() {
        const { data } = this.props
        let cancelView1 = ''

        if (data) {
            const result1 = data.filter(e => parseInt(e.oncallnumber) === 1)[0]
            const user = this.getCookie(`emp_name`)
            if(result1) {
                const res1 = result1
                if(res1.name===user){
                    cancelView1 = <h4 className={`cancel`} onClick={() => this.cancelBook(result1.id)}>Cancel</h4>
                    console.log(user + ' Owner')
                } else {
                    cancelView1 =''
                    console.log('No Owner')
                }
            } 
        }

        return(
            <div>
                {cancelView1}
                {/* {cancelView2} */}
            </div>
        )
    }
}
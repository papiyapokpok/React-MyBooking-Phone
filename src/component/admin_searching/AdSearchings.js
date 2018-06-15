import React, { Component } from 'react'

import AdSearchingChild from './child/AdSearchingChild'

import firebase from '../../firebase'
import swal from 'sweetalert';
import moment from 'moment'
import { DateRangePicker } from 'react-dates';

import './style/AdSearchingStyle.css'

export default class AdSearchings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            load: false,
            emailSearch: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.setDateTime = this.setDateTime.bind(this)
    }
    
    handleChange(event) {
        this.setState({emailSearch: event.target.value});
    }

// Date Picker
    setDateTime = (a, b) => {
        this.setState({
            startDate: a,
            endDate: b,
        })
    }
//Date Picker    
    setFocusState = (focus) => {
        this.setState({
            focusedInput: focus.focusedInput,
        })
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
        return null;                        
    }

    adBookNow = () => {
        if(this.state.startDate && this.state.endDate && this.state.emailSearch) {
            const db = firebase.firestore();
 
            const email = this.state.emailSearch
            const oncallnumber = this.state.onCallNum
            const start = this.state.startDate.toDate();
            start.setHours(0,0,0)
            const end = this.state.endDate.toDate();
            end.setHours(23, 59, 59)
            this.setState({data: ''})
            this.setState({load: true})
            db.collection("oncalllogs") 
                .where('dateTime', '>=', start)
                .where('dateTime', '<=', end) 
                .where('email', '==', email)
            .onSnapshot((querySnapshot) => {
                var data = [];
                if(querySnapshot.size > 0) {
                    querySnapshot.forEach((querySnapshot) => {
                        data.push(querySnapshot.data())
                    });
                    this.setState({
                        data,
                    })
                    this.setState({load: false})
                } else {
                    swal('No booking on search')
                    this.setState({load: false})                
                } 
            });
        } else if(this.state.startDate && this.state.endDate) {
            const db = firebase.firestore();
            const oncallnumber = this.state.onCallNum
            const start = this.state.startDate.toDate();
            start.setHours(0,0,0)
            const end = this.state.endDate.toDate();
            end.setHours(23, 59, 59)
            this.setState({data: ''})
            this.setState({load: true})
            db.collection("oncalllogs")  
                .where('dateTime', '>=', start)
                .where('dateTime', '<=', end) 
            .onSnapshot((querySnapshot) => {
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
                    swal('No booking on search')
                    this.setState({load: false})                
                } 
            });

        } else {
            swal({
                title:'Please input start date & end date for search'
            })
        }
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <tr id={'result'} key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)', border:'1px solid'}}>
                    <td className={'tdResult1'} >{e.oncallnumber}</td>
                    <td className={'tdResult2'} >{moment(e.dateTime).format('Y-MM-DD')}</td>
                    <td className={'tdResult3'} >{e.email}</td>
                    <td className={'tdResult4'} onClick={() => this.onClickDelete(e.id)} >{'Del'}</td>
                </tr>
            );            
        });    
    }

    onClickDelete = (id) =>{
        const db = firebase.firestore();
        this.setState({load: true})             
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                db.collection('oncalllogs').doc(id).delete().then(function() {
                    // console.log("Document successfully deleted!");
                    swal("Document successfully deleted!")
                }).catch(function(error) {
                    // console.error("Error removing document: ", error);
                    swal("Document cannot deleted!")        
                });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }

    render() {
        return(
            <div>
                <br />
                <AdSearchingChild 
                    {...this.state}
                    dataRender={this.dataRender}
                    adBookNow={this.adBookNow}
                    handleChange={this.handleChange}
                    setDateTime={this.setDateTime}
                    setFocusState={this.setFocusState}
                    setEmail={this.setEmail}
                    onChange={this.onChange}
                    onClickDelete={this.onClickDelete}
                />
            </div>
        )
    }
}
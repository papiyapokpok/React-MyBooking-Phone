import React, { Component } from 'react'
import '../main_style/react_dates_overrides.css'
import SearchingChild from './child/SearchingChild'

import firebase from '../../firebase'
import swal from 'sweetalert';
import moment from 'moment'
import { DateRangePicker } from 'react-dates';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

export default class Searchings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month'),
            focusedInput: null,
            onCallNum: null,
            load: false,
            emailSearch: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.setDateTime = this.setDateTime.bind(this)
    }
    
    handleChange(event) {
        // this.setState({startDate: event.target.value});
        // this.setState({endDate: event.target.value});
        this.setState({emailSearch: event.target.value});

        console.log(this.state.startDate)
        console.log(this.state.endDate)
        console.log(this.state.emailSearch)
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

    componentDidMount =() => {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            // this.loginSuccess()
        this.props.history.push('/search')
        this.onCallSearch()
            
        } else {
            // this.notLogin()
            window.location.href = "/"
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
        return null;                        
    }

    getDate = () => {
        // const start = moment().startOf('month').format('YYYY-MM-DD 00:00:00');
        // const end   = moment().endOf('month').format('YYYY-MM-DD 23:59:59');

        const start = this.state.startDate.startOf('month').format('YYYY-MM-DD 00:00:00');
        const end   = this.state.endDate.endOf('month').format('YYYY-MM-DD 23:59:59');

        console.log(start)
        console.log(end)
    }

    onCallSearch = (e) => {
        if(!this.state.startDate && !this.state.endtDate) {
            swal({
                title:'Please input start date & end date for search'
            })
        } else {
            const db = firebase.firestore();
 
            // const email = this.getCookie('staff_name')
            const email = 'sriwan.k@kaidee.com'
            // const email = this.state.emailSearch
            const oncallnumber = this.state.onCallNum
            const start = this.state.startDate.toDate();
            start.setHours(0,0,0)
            const end = this.state.endDate.toDate();
            end.setHours(23, 59, 59)

            this.setState({data: ''})
            this.setState({load: true})

            console.log(email)
            console.log(start)
            console.log(end)

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
        }
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <tr key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)'}}>
                    <td style={{border:'1px solid'}}>OnCall-0{e.oncallnumber}</td>
                    <td style={{border:'1px solid'}}>{moment(e.dateTime).format('Y-MM-DD')}</td>
                    <td>{e.email}</td>
                </tr>
            );            
        });    
    }

    render() {
        return(
            <div>
                <br />
                <SearchingChild 
                    {...this.state}
                    dataRender={this.dataRender}
                    onCallSearch={this.onCallSearch}
                    handleChange={this.handleChange}
                    setDateTime={this.setDateTime}
                    setFocusState={this.setFocusState}
                    setEmail={this.setEmail}
                    onChange={this.onChange}
                    getDate={this.getDate}
                />
            </div>
        )
    }
}
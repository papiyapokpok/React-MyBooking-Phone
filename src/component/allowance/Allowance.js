import React, { Component } from 'react'

import AllowanceChild from './child/AllowanceChild'

import firebase from '../../firebase'
import swal from 'sweetalert'
import moment from 'moment'

export default class Allowance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            choose: 'Month',
            menu: false,            
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            bath:'',
            print: true,
            views: true,
        }
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


    show = () => {
        this.setState({
            hide: !this.state.hide,
        })
    } 
    
    getData = (monthSelect) => {
        const db = firebase.firestore();

        const start = this.state.startDate._d
        start.setHours(0, 0, 0);
        const end = this.state.endDate._d
        end.setHours(23, 59, 59);
        if(start, end) {
            db.collection("oncalllogs") 
            .where('dateTime', '>', start)
            .where('dateTime', '<', end)             
            .onSnapshot((querySnapshot) => {
                var data = [];
                if(querySnapshot.size > 0) {
                    querySnapshot.forEach((querySnapshot) => {
                        data.push(querySnapshot.data())
                        console.log(data)
                    });
                    this.setState({
                        data,
                    })
                    this.printReport()
                    this.setState({load: false})
                } else {
                    swal('No booking on search')
                    this.setState({load: false})                
                } 
            });
        }
    }

    printReport = () => {
        swal({
            title: "Do you want to print?",
            buttons: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                window.print();
                this.afterPrint()  
                window.location.reload();
            } else {
                // this.setState({})
                this.afterPrint()
                // window.location.reload();                                                              
            }
        });
    }

    afterPrint = () => {           
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = 'print_status=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <tr key={i}>
                    <td className={'centerStyle'} >{moment(e.dateTime).format('Y-MM-DD')}</td>                
                    <td className={'centerStyle'} >{e.id}</td>
                    <td className={'leftStyle'} >{e.name}</td>
                    <td className={'leftStyle'} >{e.nickname}</td>
                    <td className={'leftStyle'} >{e.surname}</td>
                    <td className={'centerStyle'} >500</td>
                    {/* <td style={{textAlign:'center'}}>{e.email}</td> */}
                </tr>
            );            
        });    
    }



    render() {
        return(
            <div>
                <AllowanceChild 
                    {...this.state}
                    show={this.show}
                    setDateTime={this.setDateTime}
                    setFocusState={this.setFocusState}
                    getData={this.getData}
                    dataRender={this.dataRender}
                />
            </div>
        )
    }
}
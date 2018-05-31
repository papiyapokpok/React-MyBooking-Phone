import React, { Component } from 'react';

import request from 'superagent';
import './react_dates_overrides.css';
import './CustomStyle.css'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import swal from 'sweetalert';
import menuList from '../assets/imgs/menu-list.png';

import MainMenuCom from '../menu/MainMenuCom'
import MenuListBox from '../header/MenuListBox'
import ButtonBookBox from '../button/ButtonBookBox'
import TableViewBox from '../table/TableViewBox'

import { PropTypes } from 'prop-types';
import moment from 'moment'

import firebase from '../../firebase'

export default class SearchDayCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,            
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            load: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    componentDidMount =() => {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            // this.loginSuccess()
        this.props.history.push('/search')
            
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

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.startDate);
        alert('A name was submitted: ' + this.state.endDate);
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
        console.log               
    }

    onCallSearch = (e) => {
        if(!this.state.startDate && !this.state.endtDate) {
            swal({
                title:'Please input start date & end date for search'
            })
        } else {
 
            const email = this.getCookie('staff_name')
            const oncallnumber = this.state.onCallNum
            var db = firebase.firestore();
            var start = this.state.startDate.toDate();
            start.setHours(0,0,0)
            var end = this.state.endDate.toDate();
            end.setHours(23, 59, 59)
            console.log(start)
            console.log(end)
            

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
        }
    
    }


    onSubmit =  (e) => {
        if(e) e.preventDefault();
        const startDate = this.state.startDate
        const endDate = this.state.endDate
        if(startDate, endDate) {
            this.getData()        
        } else if(startDate, endDate == null){
            swal('Please choose start date & end date for search')
        } 
    }

    show = () => {
        this.setState({
            hide: !this.state.hide,
        })
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <tr key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)'}}>
                    <td>{e.oncallnumber}</td>
                    <td>{moment(e.dateTime).format('Y-MM-DD')}</td>
                    <td style={{textAlign:'center'}}>{e.email}</td>
                </tr>
            );            
        });    
    }

    static propTypes = {
        history: PropTypes.object,
    }

    oncallBook = () => {
        this.props.history.push('/menu')
    }

    search = () => {
        this.props.history.push('/search')
    }

    menuListClick = () => {
        this.setState({
            menu: !this.state.menu
        })
        console.log('Search Menu List')  
    }


    loginSuccess = () => {
        this.props.history.push('/menu')
    }

    render() {
    const { startDate, endDate, data, menu, load } =this.state
    
    let loading = ''
    if(load) {
        loading = `Now loading...`
    }

    let dataValue = '';
    let rowCount = 'Total: 0';
    if (data) {
        dataValue = this.dataRender(data);
        rowCount = `Total:  ${data.length} `;  //วิธีการต่อ String
    } 

    const tableHeader ={
        border:'1px solid', 
        backgroundColor:'rgb(25, 169, 241)',
        paddingLeft:'4px'
    };
        return(
            <div>
                <br />
                <div style={{textAlign:'-webkit-center'}}>
                    <DateRangePicker 
                        orientation="horizontal" 
                        // verticalHeight={330} 
                        // horizontalWidth={200}
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }) } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} 
                        isOutsideRange={() => false}
                        // popoverAttachment='bottom right'
                        // popoverTargetAttachment='top right'
                        numberOfMonths={1}
                        withFullScreenPortal
                    />
                </div>
                <div>
                    <ButtonBookBox className="Search-Button" onClick={this.onCallSearch} title={'Search'} />
                </div>

                <div className="divTable">
                    <table className="tebleStyle" style={{border:'1px solid'}}>
                        <thead>
                            <tr>
                                <th style={tableHeader}>Oncall</th>
                                <th style={tableHeader}>Date</th> 
                                <th style={tableHeader}>Account</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {dataValue}
                        </tbody>                            
                    </table>
                </div><br />

                {loading}
                
                
                <div style={{textAlign:'right', padding:'18px', marginRight:'65px'}}>
                        {rowCount}
                </div>
            </div> 
                           
        )
    }
}
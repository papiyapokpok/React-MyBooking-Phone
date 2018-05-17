import React, { Component } from 'react'
import adminLogo from '../assets/imgs/admin.png'

import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DateRangePicker } from 'react-dates';
import swal from 'sweetalert';
import request from 'superagent';

import ButtonBookBox from '../button/ButtonBookBox'

const leftStyle = {
    textAlign: 'left',
    paddingLeft: '12px'
};

export default class AdminMenuCom extends Component {
    
    static PropType = {
        history: PropTypes.object,
    }


    // adminMenu = () => {
    //     this.props.history.push('/adminmenu')
    // }

    constructor(props) {
        super(props);
        this.state = {
            menu: false,            
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            bath:''
        };
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    // componentDidMount =() => {
    //     const checkCookie = this.getCookie('staff_name')
    //     if(checkCookie) {
    //         // this.loginSuccess()
    //     this.props.history.push('/search')
            
    //     } else {
    //         // this.notLogin()
    //         window.location.href = "/"
            
    //     }
    // }

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

        onSubmit =  (e) => {
            if(e) e.preventDefault();
            this.getData()
        }

        getData = () => {
    
            const startDate = this.state.startDate.format('YYYY-MM-DD')
            const endDate = this.state.endDate.format('YYYY-MM-DD')  
            
            if(startDate) {
                const payload = {
                    startDate,
                    endDate,
                }
                request
                    .post('http://172.25.11.98/oncall/searchDataReport.php')
                    .set('content-type', 'applecation/json')
                    .send(payload)
                    .end((err, res) => {
                        console.log(payload)
                    if(res.body.status === false) {
                        swal('คุณไม่ได้ถือ OnCall เลยในเดือนนี้ ');
                        this.setState({
                            choose: 'Choose Month',
                        })
                    }
                    this.setState({data: res.body})
                })
            } else {
                swal("Please choose date for search.");
            }
        }

        show = () => {
            this.setState({
                hide: !this.state.hide,
            })
        }



        dataRender = (data) => {
            
            return Object.keys(data).map(key => {
                return (
                    <tr key={key} >
                        <td>{data[key].oncalldate}</td>
                        <td style={leftStyle} >{data[key].staffName}</td>
                        <td>{data[key].staffid}</td>
                        <td style={leftStyle} >{data[key].staffName}</td>
                        <td style={leftStyle} >{data[key].staffSurname}</td>
                        <td id="cells" value={()=>{this.state.bath(500)}}>500</td>
                    </tr>
                );         
            });                 
        }


        static propTypes = {
            history: PropTypes.object,
        }

    // index = () => {
    //     this.props.history.push('/')
    //     console.log('test onclick menu')
    // }

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
        console.log(this.props)
        const { ...res } = this.props
        const adminStyle = {
            position:'absolute',
            width: '24px',
            right: '25px',
            top: '260px'        
    }

    const { startDate, endDate, data, menu, cells } =this.state  
    let dataValue = '';
    let dataSum = '';
    let rowCount = 'Date Total: 0';
    let sumCount = 'Sum:   0.  Bath';
    if(data) {
        dataValue = this.dataRender(data);
        rowCount = 'Date total: ' + data.length ;

        sumCount = 'Sum: ' + data.length*500 + ' Bath.'

    }

    const tableHeader ={
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        paddingLeft:'4px',
        width: '20%'
    };
    const tableHeaderL ={
        borderBottom: '1px solid black',
        paddingLeft:'4px',
        width: '20%'
    };
        return(
            <div>
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
                    <ButtonBookBox className="Search-Button" onClick={this.onSubmit} title={'Search'} />
                </div>



                <div className="divTable">
                    <table className="tebleStyle" style={{border:'1px solid'}}>
                        <thead>
                            <tr>
                                <th style={tableHeader}>Date</th>
                                <th style={tableHeader}>Nickname</th> 
                                <th style={tableHeader}>Id</th>
                                <th style={tableHeader}>Name</th>
                                <th style={tableHeader}>Surname</th>                                
                                <th style={tableHeaderL}>Allowance(THB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataValue}
                        </tbody>                            
                    </table>
                </div>
                <div style={{width:'90%'}}>
                    <div style={{textAlign:'left', padding:'18px', marginLeft:'44px', width:'40%', float:'left'}}>
                            {rowCount}
                    </div>
                    <div style={{textAlign:'right', padding:'18px', marginRight:'-84px', width:'40%', float:'right'}}>
                            {sumCount}
                    </div>
                </div>

            </div> 

        )
    }
}
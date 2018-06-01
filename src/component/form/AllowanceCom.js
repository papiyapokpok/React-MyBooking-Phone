import React, { Component } from 'react'
import adminLogo from '../assets/imgs/admin.png'
import print from '../assets/imgs/print.png'
import pdf from '../assets/imgs/pdf.png'


import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DateRangePicker } from 'react-dates';
import swal from 'sweetalert';
import request from 'superagent';
import moment from 'moment'
import ReactToPrint from "react-to-print";

import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'

import ButtonBookBox from '../button/ButtonBookBox'
import PrintCom from '../Amenu/PrintCom'

import firebase from '../../firebase'

const leftStyle = {
    textAlign: 'left',
    paddingLeft: '24px',
    border: '1px solid black'
};

const centerStyle = {
    textAlign: 'center',
    border: '1px solid black'
};

export default class AllowanceCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            choose: 'Month',
            menu: false,            
            startDate: null,
            endDate: '',
            focusedInput: null,
            onCallNum: null,
            bath:'',
            print: true,
            views: true,
        };
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount =() => {
        
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

        handleChange = (event) => {
            this.setState({endDate: event.target.value})
        }

        handleSubmit = (event) => {
            event.preventDefault();  
            const endDate = this.state.endDate                      
            alert('A name was submitted: ' + this.state.startDate);
            alert('A name was submitted: ' + this.state.endDate);
            if(alert) {
                this.getData()
            }
        } 

        onSubmit =  (e) => {
            if(e) e.preventDefault();
            this.getData()
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
                // .get()
                .onSnapshot((querySnapshot) => {
                    var data = [];
                    if(querySnapshot.size > 0) {
                        querySnapshot.forEach((querySnapshot) => {
                            data.push(querySnapshot.data())
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

        dataRender = (data) => {
            return data.map((e, i) => {
                return (
                    <tr key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)'}}>
                        <td style={centerStyle} >{moment(e.dateTime).format('Y-MM-DD')}</td>                
                        <td style={leftStyle} >{e.nickname}</td>
                        <td style={centerStyle} >{e.id}</td>
                        <td style={leftStyle} >{e.name}</td>
                        <td style={leftStyle} >{e.surname}</td>
                        <td style={centerStyle} >500</td>
                        {/* <td style={{textAlign:'center'}}>{e.email}</td> */}
                    </tr>
                );            
            });    
        }

        show = () => {
            this.setState({
                hide: !this.state.hide,
            })
        }   

        savePDF() {
            const input = document.getElementById('divToPrint');

            html2canvas(input)
              .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF(
                    {
                        orientation: 'p',
                        unit: 'mm',
                        format: [210, 460],
                    }
                );
                pdf.addImage(imgData, 'JPEG', 0, 10);
                // pdf.internal.getVerticalCoordinateString()
                // pdf.output('dataurlnewwindow');
                pdf.save("Oncall Allowance.pdf");
                pdf.autoPrint()
            })
        }

        setCookiePrint = (cname, cvalue, exdays) => {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
                    this.setState({})
                    this.afterPrint()
                    window.location.reload();                                                              
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

        static propTypes = {
            history: PropTypes.object,
        }

        resetForm = () => { 
            this.setState({
                nameSearch:''
            })
        }
         
        changeData = (id, value) => {
            let temp = this.state.data.slice();
            temp[id] = value;
            this.setState({temp});
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
        }

        loginSuccess = () => {
            this.props.history.push('/menu')
        }

    render() {
        const { ...res } = this.props

        const { startDate, endDate, data, menu, cells, views } =this.state  
        let dataValue = '';
        let dataSum = '';
        let sumValue = 0
        let rowCount = 'Total: 0 Day' ;
        let sumCount = 'Sum:   0.  Bath';
        let classHide = '';
        // let menu = ''
    if(data) {
        dataValue = this.dataRender(data);
        rowCount = 'Total: ' + data.length + ' Day';

        sumValue = data.length*500
        sumCount = 'Sum: ' + sumValue.toLocaleString(navigator.language, { minimumFractionDigits: 0 })  + ' Bath.'
    }
    if (this.state.hide) {
        classHide = 'hide'
    }
    const adminStyle = {
        position:'absolute',
        width: '24px',
        right: '25px',
        top: '260px'        
    };

    const tableHeader ={
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        paddingLeft:'4px',
        width: '36mm'
    };
    const tableHeaderL ={
        borderBottom: '1px solid black',
        paddingLeft:'4px',
        width: '36mm'
    };

    const superMainDiv = {
        textAlign: '-webkit-center',
        backgroundColor: 'white',
        width: '210mm',
        height: 'auto',
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10pt',
        marginTop: '1pt',
        lineBreaks:'51pt',
        lineHeight:'16pt',
        paddingBottom: '60px'
    }

    const chooseMonth = {
        position: 'absolute',
        top: '0px',
        right: '-3px'
    }
    const printStyle = {
        position: 'relative',        
        width: '30px',
        right: '-360px',
        top: '32px'
    }
    const pdfStyle = {
        position: 'relative',        
        width: '50px',
        right: '-276px',
        top: '70px'
    }
    const searchStyle = {
        position: 'absolute',
        top: '166px',
        right: '45%',
        left: '45%'
    }
    let viewer = ''
    if(dataValue){
        viewer = (
            <div style={{marginTop:'-80px'}}>
                {/* <img src={print} alt="print" style={printStyle} onClick={this.printReport}/>
                <img src={pdf} alt="print" style={pdfStyle} onClick={this.savePDF}/>   */}
                <br />   
                <br />     
            </div>
        )
    } else {
        viewer = (
            <div style={{marginTop:'-50px'}}>
                <img src={print} alt="print" style={printStyle} onClick={this.getData}/>
                {/* <img src={pdf} alt="print" style={pdfStyle} onClick={this.savePDF}/>   */}
                {/* <p style={searchStyle} onClick={this.getData}>Search</p>               */}
                <br />
                <div style={chooseMonth}>
                    {/* <p onClick={this.show} >{this.state.choose}</p> */}
                    <DateRangePicker 
                        orientation="horizontal" 
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }) } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} 
                        isOutsideRange={() => false}
                        numberOfMonths={1}
                        withFullScreenPortal
                    />
                </div>
            </div>
        )
    }
 
        return(
            <div style={{backgroundColor:'white'}}>
                <br />
                <br />
                <br />
                <div id="divToPrint" className="SupperMainDiv" style={superMainDiv}>
                    <div > 
                        <h2 style={{paddingTop:'0px', marginTop:'-8px'}}>On Call Allowance Request Form</h2>
                    </div>  
                    {viewer}
                    <div>
                        <table className="tebleStyle" style={{border:'1px solid', marginTop:'40px'}}>
                            <thead>
                                <tr>
                                    <th style={tableHeader}>Date</th>
                                    <th style={tableHeader}>Nickname</th> 
                                    <th style={tableHeader}>ID</th>
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
                        <div style={{textAlign:'left', padding:'18px', marginLeft:'-23px', width:'40%', float:'left'}}>
                            {rowCount}
                        </div>
                        <div style={{textAlign:'right', padding:'18px', marginRight:'-27px', width:'40%', float:'right'}}>
                            {sumCount}
                        </div>
                    </div>
                </div>                
            </div> 

        )
    }
}

const listMonth = {
    position: 'fixed',
    top: '265px',
    left: '30.3%',
    backgroundColor: 'rgb(253, 253, 253)',
    listStyle: 'none',
    paddingLeft: '0px',
    marginTop: '0.5px',
    width: '200px',
    textAlign: 'left'
}
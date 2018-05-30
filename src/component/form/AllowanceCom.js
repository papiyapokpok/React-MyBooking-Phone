import React, { Component } from 'react'
import adminLogo from '../assets/imgs/admin.png'
import print from '../assets/imgs/print.png'
import pdf from '../assets/imgs/pdf.png'


import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DateRangePicker } from 'react-dates';
import swal from 'sweetalert';
import request from 'superagent';
import ReactToPrint from "react-to-print";

import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'

import ButtonBookBox from '../button/ButtonBookBox'
import PrintCom from '../Amenu/PrintCom'

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
    
    static PropType = {
        history: PropTypes.object,
    }


    // adminMenu = () => {
    //     this.props.history.push('/adminmenu')
    // }

    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            hide: true,
            choose: 'Month',
            menu: false,            
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            bath:'',
            month: [
                "- Choose Month -",
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",

            ],
            print: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

//     componentDidUpdate =() => {
//         // const checkCookie = this.getCookie('staff_name')
//         const monthSelect = this.state.monthSelect
//         if(monthSelect) {
//             // this.getData()
//             // this.stopData()
// console.log('dadadadadadad')
//         }
//         return null;        
//     }


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

        getData = (monthSelect) => {
            console.log(monthSelect)
            if(monthSelect) {
                const payload = {
                    monthSelect
                }
                request
                    .post('http://172.25.11.98/oncall/searchMonthReport.php')
                    .set('content-type', 'applecation/json')
                    .send(payload)
                    .end((err, res) => {
                    if(res) {
                        this.setState({data: res.body})
                    } else {
                        swal('No Data on Month')
                    }
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
                        <td style={centerStyle} >{data[key].oncalldate}</td>
                        <td style={leftStyle} >{data[key].staffName}</td>
                        <td style={centerStyle} >{data[key].staffid}</td>
                        <td style={leftStyle} >{data[key].staffName}</td>
                        <td style={leftStyle} >{data[key].staffSurname}</td>
                        <td style={centerStyle} id="cells" >500</td>
                    </tr>
                );         
            });                 
        }
        
        createMonths = (data) => {
            return data.map((item, index) => {
                return (
                    <li className="liStyle" onClick={() => this.clickOnMe(("0"+index).slice(-2), item)} >{item}</li>
                );
            });    
        }

        savePDF() {
            console.log('Save to pdf')
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
                } else {
                    this.setState({})
                    this.afterPrint()                       
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
            // console.log(this.state.nameSearch);
        }
    
        clickOnMe = (id, month) => {
            this.setCookiePrint('print_status', 'print', 1)            
            this.setState({
                monthSelect: id,
                choose: month,  //วิธี setState
                hide: true,
            })
            this.getData(id)            
            console.log(id)
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
            console.log('Search Menu List')  
        }


        loginSuccess = () => {
            this.props.history.push('/menu')
        }

    render() {
        const { pageNumber, numPages } = this.state;
        console.log(this.props)
        const { ...res } = this.props


    const { startDate, endDate, data, menu, cells } =this.state  
    let dataValue = '';
    let dataSum = '';
    let sumValue = 0
    let rowCount = 'Total: 0 Day' ;
    let sumCount = 'Sum:   0.  Bath';
    let classHide = '';
    // let menu = ''
    if(data) {
        dataValue = this.dataRender(data);
        rowCount = 'Total: ' + data.length + 'Day';

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
        width: '10%',
        position: 'relative',
        top: '30px',
        left: '-333px',
        textAlign: 'left',
        paddingLeft: '63px',
        fontWeight: 'bold'
    }
    const printStyle = {
        position: 'relative',        
        width: '30px',
        right: '-360px',
        top: '88px'
    }
    const pdfStyle = {
        position: 'relative',        
        width: '50px',
        right: '-276px',
        top: '94px'
    }
        return(
            <div style={{backgroundColor:'white'}}>
                <img src={print} alt="print" style={printStyle} onClick={this.printReport}/>
                <img src={pdf} alt="print" style={pdfStyle} onClick={this.savePDF}/>                

                <ul style={listMonth} className={classHide}>
                    {this.createMonths(this.state.month)}
                </ul>

        <br />
            <div id="divToPrint" className="SupperMainDiv" style={superMainDiv}>
                <div > 
                    <h2 style={{paddingTop:'0px', marginTop:'-8px'}}>On Call Allowance Request Form</h2>
                </div>
                <div style={chooseMonth}>
                    <p onClick={this.show} >{this.state.choose}</p>
                </div>
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
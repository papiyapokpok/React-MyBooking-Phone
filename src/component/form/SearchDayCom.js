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

export default class SearchDayCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            menu: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);  
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
        const email = this.getCookie('staff_name')        
        const nameSearch = this.state.nameSearch
        const startDate = this.state.startDate.format('YYYY-MM-DD')
        const endDate = this.state.endDate.format('YYYY-MM-DD')  
        
        if(startDate) {
            const payload = {
                startDate,
                endDate,
                email,
            }
            request
                .post('http://localhost/oncall/searchDate.php')
                .set('content-type', 'applecation/json')
                .send(payload)
                .end((err, res) => {
                    // console.log(payload)
                if(res.body.status === false) {
                    swal('You cannot work on Month');
                    this.setState({
                        nameSearch: '',
                        choose: 'Choose Month',
                    })
                }
                this.setState({data: res.body})
            })
        } else {
            swal("Please choose date for search.");
        }
    }

    del = (id) => {
        const idLog = id
        // console.log(idLog)
        const payload = {
            idLog,
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                request
                .post('http://localhost/deleteDate.php')
                .set('content-type', 'applecation/json')
                .send(payload)
                .end((err, res) => {
                    console.log(res)

                    if(res.body.status === false) {
                        swal('คุณไม่สามารถยกเลิกวันที่ผ่านมาแล้วได้');
                        this.getData()                 
                    } else {
                        swal("Poof! Your data file has been deleted!", {
                            icon: "success",
                        });
                    }
                })  
              this.getData()
            } else {
              swal("Your imaginary file is safe!");
              this.getData()            
              return false;
            }
          });

          
    }

    show = () => {
        this.setState({
            hide: !this.state.hide,
        })
    }

    dataRender = (data) => {
        return Object.keys(data).map(key => {
            return (
                <tr key={key}>
                    <td>{data[key].oncallnumber}</td>
                    <td>{data[key].oncalldate}</td>
                    <td style={{textAlign:'left', paddingLeft:'16px'}}>{data[key].email}</td>
                    {/* <td onClick={() => this.del(data[key].idoncall_log)}>Del.</td> */}
                </tr>
            );            
        });    
    }

    menuListClick = () => {
        this.setState({
            menu: !this.state.menu
        })
        console.log('Menu List')  
    }

    render() {

    const { startDate, endDate, data, menu } =this.state  
    let dataValue = '';
    let rowCount = 'Total: 0';
    if(data) {
        dataValue = this.dataRender(data);
        rowCount = 'Total: ' + data.length ;
    } 

    let menuView = ''
    let classHide = ''
    let classShow = 'hide'

    if(menu) {
        menuView = <MainMenuCom {...this.props} /> 
    }

        return(
            <div>

                <div>
                    <MenuListBox image={menuList} onClick={this.menuListClick}/>
                        <div className="menuViewDiv">
                            {menuView}
                        </div>
                </div>
                
                <div style={{marginTop:'40px'}}>
                    <DateRangePicker orientation="vertical" verticalHeight={390}
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }) } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} 
                        isOutsideRange={() => false}/>
                </div>
                <div>
                    <br />
                    <button className="Search-Button" onClick={this.onSubmit} >Search</button>
                </div>

                <div className="divTable">
                    <table className="tebleStyle" style={{border:'1px solid'}}>
                        <thead>
                            <tr>
                                <th style={{border:'1px solid', backgroundColor:'rgb(41, 236, 17)',paddingLeft:'4px'}}>Oncall</th>
                                <th style={{border:'1px solid', backgroundColor:'rgb(41, 236, 17)'}}>Date</th> 
                                <th style={{border:'1px solid', backgroundColor:'rgb(41, 236, 17)'}}>Email</th>
                                {/* <th style={{border:'1px solid', backgroundColor:'rgb(41, 236, 17)'}}>Cancel</th>                                 */}
                            </tr>
                        </thead>
                        <tbody>
                            {dataValue}
                        </tbody>                            
                    </table>
                    <div style={{textAlign:'right', padding:'18px', marginRight:'65px'}}>
                        {rowCount}
                    </div>
                </div>
            </div>                
        )
    }
}
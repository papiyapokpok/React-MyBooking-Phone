import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MenuListCom from '../header/MenuListCom'
import SearchDayCom from '../form/SearchDayCom'
import HeaderBox from '../header/HeaderBox'
import OncallBookingCom from '../form/OncallBookingCom'
import SignOutCom from '../form/SignOutCom'
import Logout from '../lib/Logout'
import AdminMenuCom from '../form/AdminMenuCom'
import MenuTest from '../Amenu/MenuTest'
import print from '../assets/imgs/print.png'


import logo from '../assets/imgs/Kaidee-logo.png';

import createAcc from '../HomePage'
import HomePage from "../HomePage";

class BasicExample extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      admin: false,
      hideMenu: false,
      print: false,
      booking: false,
      report: false,
      logout: false
    }
  }
  
  signOut = () => {
    Logout.signOut()
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
  }

  render() {
    // const { admin } = this.state

    console.log(this.props)
    let hide = {
      display: 'none'
    }
    let show = {
      display: 'unset'
    }

    let admin = ''
    let print = ''
    let booking = ''
    let report = ''
    let logout = ''

    const linkStyle = {
      textDecoration: 'none',
    }

    const printStyle = {
      width: '30px',
      position: 'absolute',
      right: '45px',
      top: '144px'
    }

    const menuStyle = {
      marginTop:'8px', 
      textAlign:'center', 
      textDecoration: 'none'
    }
    const hideStyle = {
      display: 'none'
    }

  if(this.getCookie('print_status')) {
    console.log('hide')
    booking = <Link to="/menu" style={hideStyle} >Booking </Link> 

    report = <Link to="/search" style={hideStyle} >Report</Link> 

    logout = <Link onClick={this.signOut} to="/out" style={hideStyle} >Logout</Link> 
  } else {
    console.log('show')

    // test = <Link to="/test" style={linkStyle} >Test</Link>                                      

    booking = <Link to="/menu" style={linkStyle} >Booking &nbsp;&nbsp; : &nbsp;&nbsp;</Link> 

    report = <Link to="/search" style={linkStyle} >Report &nbsp;&nbsp; : &nbsp;&nbsp;</Link> 

    logout = <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout &nbsp;&nbsp; : &nbsp;&nbsp;</Link> 

  }


  if(  this.getCookie('print_status')) {
    admin = <Link to="/adminmenu" style={hideStyle}>&nbsp; &nbsp; Alowance</Link>
  }  
  if(this.getCookie('staff_name') == 'admin') {
    admin = <Link to="/adminmenu" style={linkStyle}>&nbsp;&nbsp; Alowance</Link>    
  }





    return (
      <Router>
        <div>
            <div id="menu"  style={menuStyle}>

              {booking} 
              {report} 
              {logout} 
              

                {/* <Link to="/test" style={linkStyle} >Test</Link> &nbsp;&nbsp; : &nbsp;&nbsp;                                     

                <Link to="/menu" style={linkStyle} >Booking</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                <Link to="/search" style={linkStyle} >Report</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link>    */}

              
                {admin}

            </div>
            <hr style={{border: '0.5px solid #dad9d9'}}/>

            <Route path="/menu" component={OncallBookingCom} />
            <Route path="/search" component={SearchDayCom} />
            <Route path="/adminmenu" component={AdminMenuCom} />
            <Route path="/test" component={MenuTest} />
            
                
        </div>
      </Router>
    );
  }
}

export default BasicExample;


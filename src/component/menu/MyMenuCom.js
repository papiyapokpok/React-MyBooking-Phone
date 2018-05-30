import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MenuListCom from '../header/MenuListCom'
import SearchDayCom from '../form/SearchDayCom'
import HeaderBox from '../header/HeaderBox'
import OncallBookingCom from '../form/OncallBookingCom'
import SignOutCom from '../form/SignOutCom'
import Logout from '../lib/Logout'
import MenuTest from '../Amenu/MenuTest'
import print from '../assets/imgs/print.png'
import listMenu from '../assets/imgs/menu-list.png'
import ForgetpasswordCom from '../ForgetpasswordCom'


import logo from '../assets/imgs/Kaidee-logo.png';

import createAcc from '../HomePage'
import HomePage from "../HomePage";
import CreateAccountCom from '../form/CreateAccountCom';
import AllowanceCom from '../form/AllowanceCom'
import MyAdminCom from './MyAdminCom';

export default class MyMenuCom extends Component {

  constructor(props) {
    super(props);
    this.setState = {
      admin: false,
      hideMenu: false,
      print: false,
      booking: false,
      report: false,
      logout: false,

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
  }
  
  signOut = () => {
    Logout.signOut()
  }

  setCookieMenu = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // console.log(cvalue)
  }

  menuClickLeft = () => {
    this.setCookieMenu({
        menu: !this.state.menu
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
  return "";
  // window.location.reload(true); 
  console.log               
}

  render() {

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
    let menuView = ''
    let accView =''

    const linkStyle = {
      textDecoration: 'none',
      color:'black',
      padding:'8px',

    }

    const printStyle = {
      width: '30px',
      position: 'absolute',
      right: '45px',
      top: '144px'
    }

    const menuStyle = {
      // marginTop:'8px', 
      textAlign:'center', 
      textDecoration: 'none'
    }
    const hideStyle = {
      display: 'none'
    }
    const divMenu = {
      position: 'absolute',
      zIndex: '999',
      top: '56px',
      width:'50%',
      height:'100%',
      backgroundColor:'#191818e0',
      color:'white',
      lineHeight: '35px'
    }

    const divMenuAdmin = {
      position: 'absolute',
      zIndex: '999',
      top: '56px',
      width:'50%',
      height:'100%',
      backgroundColor:'rgba(25, 123, 210, 0.88)',
      color:'white',
      lineHeight: '35px',
      fontSize: '16px',
      padding:'0px'
    }

  if(this.getCookie('print_status')) {
    console.log('hide')
    booking = <Link to="/menu" style={hideStyle} >Booking </Link> 

    report = <Link to="/search" style={hideStyle} >Report</Link> 

    logout = <Link onClick={this.signOut} to="/out" style={hideStyle} >Logout</Link> 

    admin = <Link to="/adminmenu" style={hideStyle}>Allowance</Link>

    accView = <p style={hideStyle}>Hi, {this.getCookie('staff_name')}</p>    
    
  } else if(this.getCookie('staff_name') == 'sretthakan.t@kaidee.com') {
    // test = <Link to="/test" style={linkStyle} >Test</Link>                                      

    menuView =<div style={divMenuAdmin}> 
                  <Link to="/menu" style={linkStyle} >Booking</Link> <br />
                  <Link to="/search" style={linkStyle} >Report</Link><br />
                  <Link to="/allowance" style={linkStyle}>Allowance</Link> <br />                  
                  <Link to="admin" style={linkStyle} >Admin</Link><br />
                  <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link><br />
                  
              </div> 
    accView = <p style={hideStyle}>Hi, {this.getCookie('staff_name')}</p>
  } else {
    menuView =<div style={divMenu}> 
                  <Link to="/menu" style={linkStyle} >Booking</Link> 
                  <Link to="/search" style={linkStyle} >Report</Link>
                  <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link> 
              </div> 
    accView = <p>Hi, {this.getCookie('staff_name')}</p>
             
  }
 
    return (
      <Router>
        <div>   
                 
            {/* <p onClick={this.menuClickLeft}>Menu</p> */}
            <div id="menu"  style={menuStyle}>

              {menuView} 
              {accView}

            </div>
            
            {/* <hr style={{border: '0.5px solid #dad9d9'}}/> */}

            <Route path="/menu" component={OncallBookingCom} />
            <Route path="/search" component={SearchDayCom} />
            <Route path="/allowance" component={AllowanceCom} />
            <Route path="/test" component={MenuTest} />
            <Route path="/forgetpassword" component={ForgetpasswordCom} />
            <Route path="/admin" component={MyAdminCom}  />
            
            
                
        </div>
      </Router>
    );
  }
}


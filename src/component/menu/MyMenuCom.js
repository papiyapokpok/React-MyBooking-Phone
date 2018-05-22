import React, { Component } from 'react'
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
import listMenu from '../assets/imgs/menu-list.png'



import logo from '../assets/imgs/Kaidee-logo.png';

import createAcc from '../HomePage'
import HomePage from "../HomePage";

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
      menu: false
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

  render() {
    // const { menu } = this.state

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

    const linkStyle = {
      textDecoration: 'none',
      color:'white',
      padding:'18px'
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
      width:'100%',
      height:'35px',
      backgroundColor:'#191818e0',
      color:'white',
      lineHeight: '35px'
    }

  if(this.getCookie('print_status')) {
    console.log('hide')
    booking = <Link to="/menu" style={hideStyle} >Booking </Link> 

    report = <Link to="/search" style={hideStyle} >Report</Link> 

    logout = <Link onClick={this.signOut} to="/out" style={hideStyle} >Logout</Link> 

    admin = <Link to="/adminmenu" style={hideStyle}>Alowance</Link>
    
  } else if(this.getCookie('staff_name') == 'admin') {
    // test = <Link to="/test" style={linkStyle} >Test</Link>                                      

    menuView =<div style={divMenu}> 
                  <Link to="/menu" style={linkStyle} >Booking</Link> 
                  <Link to="/search" style={linkStyle} >Report</Link>
                  <Link to="/adminmenu" style={linkStyle}>Alowance</Link>                   
                  <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link>
            </div> 

  

  } else {
    menuView =<div style={divMenu}> 
                  <Link to="/menu" style={linkStyle} >Booking</Link> 
                  <Link to="/search" style={linkStyle} >Report</Link>
                  <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link>
            </div> 
  }
 
    return (
      <Router>
        <div>
            {/* <p onClick={this.menuClickLeft}>Menu</p> */}
            <div id="menu"  style={menuStyle}>

              {menuView} 

            </div>
            {/* <hr style={{border: '0.5px solid #dad9d9'}}/> */}

            <Route path="/menu" component={OncallBookingCom} />
            <Route path="/search" component={SearchDayCom} />
            <Route path="/adminmenu" component={AdminMenuCom} />
            <Route path="/test" component={MenuTest} />
            
                
        </div>
      </Router>
    );
  }
}


import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MenuListCom from '../header/MenuListCom'
import SearchDayCom from '../form/SearchDayCom'
import HeaderBox from '../header/HeaderBox'
import OncallBookingCom from '../form/OncallBookingCom'
import SignOutCom from '../form/SignOutCom'
import Logout from '../lib/Logout'
import AdminMenuCom from '../form/AdminMenuCom'

import logo from '../assets/imgs/Kaidee-logo.png';

import createAcc from '../HomePage'
import HomePage from "../HomePage";

class BasicExample extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      admin: false
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
    return "";
    // window.location.reload(true); 
    console.log               
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

    const linkStyle = {
      textDecoration: 'none',
    }

    if(this.getCookie('staff_name') == 'admin') {
      admin = <Link to="/adminmenu" style={linkStyle}>&nbsp; : &nbsp; Admin</Link>
    }



    return (
      <Router>
        <div>
            {/* <HeaderBox image={logo}/> */}
                <div  style={{marginTop:'8px', textAlign:'center', textDecoration: 'none'}}>

                    <Link to="/menu" style={linkStyle} >Booking</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                    <Link to="/search" style={linkStyle} >Report</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                    <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link>   
                  
                    {admin}

                </div>
        <hr />
        <p >Hi, {this.getCookie('staff_name')}  </p>              
        

          {/* <Route exact path="/" component={Home} /> */}
            <Route path="/menu" component={OncallBookingCom} />
            <Route path="/search" component={SearchDayCom} />
            <Route path="/adminmenu" component={AdminMenuCom} />
                
        </div>
      </Router>
    );
  }
}

export default BasicExample;


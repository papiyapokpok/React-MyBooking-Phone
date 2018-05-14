import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MenuListCom from '../header/MenuListCom'
import SearchDayCom from '../form/SearchDayCom'
import HeaderBox from '../header/HeaderBox'
import OncallBookingCom from '../form/OncallBookingCom'
import SignOutCom from '../form/SignOutCom'
import Logout from '../lib/Logout'


import logo from '../assets/imgs/Kaidee-logo.png';

class BasicExample extends Component {
  
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

    console.log(this.props)


    return (
      <Router>
        <div>
            {/* <HeaderBox image={logo}/> */}
                <div  style={{marginTop:'8px'}}>

                    <Link to="/menu">Booking</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                    <Link to="/search">Search</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                    <Link onClick={this.signOut} to="/out">Logout</Link> 

                                  
                </div>
        <hr />
        <p >Hi, {this.getCookie('staff_name')}  </p>              
        

          {/* <Route exact path="/" component={Home} /> */}
            <Route path="/menu" component={OncallBookingCom} />
            <Route path="/search" component={SearchDayCom} />
            {/* <Route path="/out" component={SignOutCom} /> */}
                
        </div>
      </Router>
    );
  }
}

export default BasicExample;


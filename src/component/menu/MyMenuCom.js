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


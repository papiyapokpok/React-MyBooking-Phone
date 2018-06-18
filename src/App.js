import React, { Component } from 'react';
import './App.css';

import { Route, Switch, Link } from 'react-router-dom';
// import logo from '../src/component/assets/imgs/asset-logo.png'

import HeaderCom from './component/header/HeaderCom';

import MainApp from './component/MainApp';
import HomePage from './component/HomePage';
import admin_searching from './component/admin_searching/AdSearchings'

import menuDraw from './component/assets/imgs/menu-list.png'
import Booking from './component/booking/Booking'

import { PropTypes } from 'prop-types'
import swal from 'sweetalert'

import { DB_CONFIG } from './config/config'
// import firebase from 'firebase/app'
import firebase from 'firebase'
// import DataMigrate from './component/lib/DataMigrate';
import Searching from './component/searching/Searchings';
import AdminBooking from './component/admin_booking/AdminBooking';
import Allowance from './component/allowance/Allowance';

import 'react-dates/initialize'


class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: 'name',
      password: 'oooo',
      menu: false,
      img: false,
      logout: false,
      load: false
    }
}

handleChange(e) {
  this.setState({
    [e.target.username]: e.target.value
  });
}

static propTypes = {
  history: PropTypes.object,
}

signOut = () => {
  // Logout.signOut()
  this.show()
  this.setState({load: true})
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    this.clearCookie()
    this.homePage()
    // this.setState({load: false})
    
  }).catch(function(error) {
    // An error happened.
  });
}

clearCookie = () => {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'emp_email=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'emp_id=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'emp_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'emp_nickname=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'emp_surname=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}


homePage() {
  window.location.href = '/'
}

show = () => {
  this.setState({
      menu: !this.state.menu,
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
}

  render() {
    const { menu, book, img, load } = this.state

    const menuStyle = {
      width: '32px',
      position: 'absolute',
      left: '14px',
      top: '13px'
    }

    let menuList = ''
    let imgMenu = ''
    const menuHide = {
      display:'none'
    }

    const linkStyle = {
      textDecoration: 'none',
      color:'black',
      padding:'8px',
      lineHeight: '40px',
      fontSize:'100%',
      color:'white'
    }

    const staffNameStyle = {
      position: 'absolute',
      bottom: '60px',

    }
    const loadingStyle = {
      position: 'absolute',
      paddingTop: '20%',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex:'999'
    }
    let loading =''
    if(load) {
      loading = <h2 style={loadingStyle}>Now loading...</h2>
    }

    if(this.getCookie('staff_name')) {
      imgMenu = <img src={menuDraw} style={menuStyle} onClick={this.show}/>
    }
    if(menu) {
      if(this.getCookie('staff_name') == 'sretthakan.t@kaidee.com') {
        menuList = (
          <div>
            <div className={'AppListMenu'}> 
            <h3>User Menu</h3>            
              <Link to="/booking" style={linkStyle} onClick={this.show} > - Booking</Link> <br />                         
              <Link to="/search" style={linkStyle} onClick={this.show} > - Search</Link> <br />  
              
              <hr style={{width:'94%', float:'left'}} />
              <h3>Admin Menu</h3>              
                       
              <Link to="/adbook" style={linkStyle} onClick={this.show} > - Booking</Link> <br />   
              <Link to="/adsearching" style={linkStyle} onClick={this.show} > - Search</Link> <br />                         
              <Link to="/adallowance" style={linkStyle} onClick={this.show} > - Allowance</Link> <br />   
              <Link onClick={this.signOut} to="/out" style={linkStyle} > - Logout</Link><br />
                                    
              
              <p style={staffNameStyle}> {this.getCookie('staff_name')}</p>
            </div>
            <div  className={'overlayStyle'} onClick={this.show}/>
          </div>
        )
      } else {
        menuList = (
          <div>
            <div className={'AppListMenu'}> 
            <h3>User Menu</h3>                        
              <Link to="/booking" style={linkStyle} onClick={this.show} > - Booking</Link> <br />                         
              <Link to="/search" style={linkStyle} onClick={this.show} > - Report</Link> <br /> 
              <Link onClick={this.signOut} to="/out" style={linkStyle} > - Logout</Link><br />
              <hr style={{width:'94%', float:'left'}} />              
              <p style={staffNameStyle}> {this.getCookie('staff_name')}</p>
            </div>
            <div  className={'overlayStyle'} onClick={this.show}/>
          </div>
        )
      }
    }
    
    let logoutView = ''
    if(this.getCookie('staff_name')) {
      logoutView = (
        <button onClick={this.signOut} to="/out" className={'logoutButton'} >Log out</button>
      )
    }

    return (
      <div className="App">
        <header className="App-header"> {this.props.children}  
          {imgMenu}                
          <Route component={MainApp} />
          {menuList}{logoutView}
          {loading}
          <Switch>
            <Route exact path="/" component={HomePage} username={this.props.username} />
            <Route exact path="/booking" component={Booking} /> 
            <Route path="/search" component={Searching} /> 
            <Route path="/adsearching" component={admin_searching} /> 
            <Route path="/adbook" component={AdminBooking} />  
            <Route path="/adallowance" component={Allowance} />          
          </Switch>
          
        </header>



      </div>
    );
  }
}

export default App;

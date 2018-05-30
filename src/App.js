import React, { Component } from 'react';
import './App.css';

import { Route, Switch, Link } from 'react-router-dom';
// import logo from '../src/component/assets/imgs/asset-logo.png'

import HeaderCom from './component/header/HeaderCom';
import MenuListCom from './component/header/MenuListCom';
import MainMenuCom from './component/menu/MainMenuCom';
import Logout from './component/lib/Logout'

import MyMenuCom from './component/menu/MyMenuCom';

import MainApp from './component/MainApp';
import HomePage from './component/HomePage';
import CreateAccountCom from './component/form/CreateAccountCom';
import ForgetpasswordCom from './component/ForgetpasswordCom';
import SearchDayCom from '../src/component/form/SearchDayCom';
import OncallBookingCom from './component/form/OncallBookingCom';
import MenulistCom from './component/header/MenuListCom'
import SignOutCom from './component/form/SignOutCom'
import menuDraw from './component/assets/imgs/menu-list.png'

import { PropTypes } from 'prop-types'
import swal from 'sweetalert'

import { DB_CONFIG } from './config/config'
// import firebase from 'firebase/app'
import firebase from 'firebase'
import AllowanceCom from './component/form/AllowanceCom';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: 'name',
      password: 'oooo',
      menu: false,
      img: false,
      logout: false,
      
    }
}

// componentDidMount = () => {
//   if(window.location.href.indexOf("/") > -1) {
//     this.setState({img: false})
//  } else {
//     this.setState({img: true})
//  }
// }

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
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    this.homePage()
  }).catch(function(error) {
    // An error happened.
  });
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
  console.log               
}


  render() {
    const { menu, book, img } = this.state

    const menuStyle = {
      width: '32px',
      position: 'absolute',
      left: '14px',
      top: '13px'
    }
    const listMenu = {
      width: '50%',
      height: '100%',
      position: 'absolute',
      top: '56px',
      backgroundColor: 'rgb(108, 110, 111)',
      zIndex: '999',
      textAlign: 'left',
      paddingLeft: '16px',
      color: 'white'
    }

    const overlayStyle = {
      position: 'fixed',
      backgroundColor: 'rgba(0,0,0,0.3)',
      width: '100%',
      height: '100%',
      zIndex:'99'
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
      fontSize:'16px',
      color:'white'
    }

    const staffNameStyle = {
      position: 'absolute',
      bottom: '60px',

    }

    if(this.getCookie('staff_name')) {
      imgMenu = <img src={menuDraw} style={menuStyle} onClick={this.show}/>
      
    }
    if(menu) {
      menuList = (
        <div>
          <div style={listMenu}> 
          <br />
            <Link to="/home" style={linkStyle} onClick={this.show} >Booking</Link> <br />
            <Link to="/search" style={linkStyle} onClick={this.show} >Report</Link><br />
            <Link to="/allowance" style={linkStyle} onClick={this.show} >Allowance</Link> <br />                  
            <Link to="admin" style={linkStyle} onClick={this.show} >Admin</Link><br />
            <Link onClick={this.signOut} to="/out" style={linkStyle} >Logout</Link><br />
            <p style={staffNameStyle}> {this.getCookie('staff_name')}</p>
          </div>
          <div  style={overlayStyle} onClick={this.show}/>
        </div>
      )
    }

    return (
      <div className="App">
        <header className="App-header"> {this.props.children}  
          {imgMenu}                
          <Route component={MainApp} />
          {menuList}
          <Switch>
            <Route exact path="/" component={HomePage} username={this.props.username} />
            <Route path="/home" component={OncallBookingCom} />  
            <Route path="/search" component={SearchDayCom} /> 
            <Route path="/allowance" component={AllowanceCom} />  
             

            <Route path="/createacc" component={CreateAccountCom} />
            <Route path="/forgetpassword" component={ForgetpasswordCom} /> 
            <Route path="/mainmenu" component={MainMenuCom} />           
          </Switch>
          
        </header>



      </div>
    );
  }
}

export default App;

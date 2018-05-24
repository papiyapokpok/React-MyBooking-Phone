import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
// import logo from '../src/component/assets/imgs/asset-logo.png'

import HeaderCom from './component/header/HeaderCom';
import MenuListCom from './component/header/MenuListCom';
import MainMenuCom from './component/menu/MainMenuCom';

import MyMenuCom from './component/menu/MyMenuCom';

import MainApp from './component/MainApp';
import HomePage from './component/HomePage';
import CreateAccountCom from './component/form/CreateAccountCom';
import ForgetpasswordCom from './component/ForgetpasswordCom';
import SearchDayCom from '../src/component/form/SearchDayCom';
import OncallBookingCom from './component/form/OncallBookingCom';
import MenulistCom from './component/header/MenuListCom'
import SignOutCom from './component/form/SignOutCom'

import { PropTypes } from 'prop-types'
import swal from 'sweetalert'
import AdminMenuCom from './component/menu/AdminMenuCom';

import { DB_CONFIG } from './config/config'
// import firebase from 'firebase/app'
import firebase from './firebase.js'

class App extends Component {
  constructor(props) {
    super(props); 
    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.db = this.app.database().ref().child('username', 'password');
    this.state = {
      username: 'name',
      password: 'oooo'
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


  render() {
    return (
      <div className="App">
        <header className="App-header">
                {this.props.children}  
          <Route component={MainApp} />
          
          <Switch>
            
            <Route exact path="/" component={HomePage} username={this.props.username} />
            <Route component={MyMenuCom} /> 
            
            <Route path="/menulist" component={MenuListCom} />
            
            <Route path="/menu" component={MyMenuCom} />
            <Route path="/search" component={SearchDayCom} />             
             
            <Route path="/createAcc" component={CreateAccountCom} />
            <Route path="/forgetpassword" component={ForgetpasswordCom} /> 

            <Route path="/mainmenu" component={MainMenuCom} /> 
            <Route path="/adminmenu" component={AdminMenuCom} />
            
            {/* <Route path="/signout" component={SignOutCom} />  */}
                        
          </Switch>
          
        </header>



      </div>
    );
  }
}

export default App;

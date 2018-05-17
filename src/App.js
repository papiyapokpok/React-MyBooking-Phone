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


class App extends Component {

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
            
            <Route exact path="/" component={HomePage} />
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

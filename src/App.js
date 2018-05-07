import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import logo from '../src/component/assets/imgs/asset-logo.png'

import HeaderCom from './component/header/HeaderCom';
import MenuListCom from './component/header/MenuListCom';
import MainMenuCom from './component/menu/MainMenuCom';
import MainApp from './component/MainApp';
import HomePage from './component/HomePage';
import CreateAccountCom from './component/form/CreateAccountCom';
import ForgetpasswordCom from './component/ForgetpasswordCom';
import SearchDayCom from '../src/component/form/SearchDayCom';
import OncallBookingCom from './component/form/OncallBookingCom';
import MenulistCom from './component/header/MenuListCom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <MenulistCom />
                {this.props.children}  
          <Route component={MainApp} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/menulist" component={MenuListCom} />
            
            <Route path="/menu" component={OncallBookingCom} />
            <Route path="/createAcc" component={CreateAccountCom} />
            <Route path="/forgetpassword" component={ForgetpasswordCom} /> 

            <Route path="/mainmenu" component={MainMenuCom} /> 
            <Route path="/search" component={SearchDayCom} />             
                        
          </Switch>
        </header>


        {/* <main>
          <Route exact path="/menu" component={MainMenuCom}  />
        </main> */}


      </div>
    );
  }
}

export default App;

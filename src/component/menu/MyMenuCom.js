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
    this.signOut()
  }

    // static propTypes(){
    //   history: PropTypes.object,
    // }

  signOut = () => {    
    var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    console.log('Logout')
    this.homePage()
    window.location.reload()
  }

  homePage = () => {
      this.props.history.push('/')
      console.log('test onclick menu')
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
            <Route exact path="/menu" component={OncallBookingCom} />
            <Route path="/search" component={SearchDayCom} />
            {/* <Route path="/out" component={SignOutCom} /> */}
                
        </div>
      </Router>
    );
  }
}

// const Logout = (logout) => (
//   <div>

//   </div>
// );

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.url}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// );




export default BasicExample;


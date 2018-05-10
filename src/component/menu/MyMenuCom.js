import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MenuListCom from '../header/MenuListCom'
import SearchDayCom from '../form/SearchDayCom'
import HeaderBox from '../header/HeaderBox'
import OncallBookingCom from '../form/OncallBookingCom'
import SignOutCom from '../form/SignOutCom'
// import MyMenuCom from '../menu/MyMenuCom'

import logo from '../assets/imgs/Kaidee-logo.png';

const BasicExample = () => (
  <Router>
    <div>
        {/* <HeaderBox image={logo}/> */}
            <div  style={{marginTop:'8px'}}>
                <Link to="/menu">Booking</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                <Link to="/search">Search</Link> &nbsp;&nbsp; : &nbsp;&nbsp; 

                <Link to="/out">Logout</Link>                
            </div>
    <hr />

      {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/menu" component={OncallBookingCom} />
        <Route path="/search" component={SearchDayCom} />
        <Route path="/out" component={SignOutCom} />
            
    </div>
  </Router>
);

// const Home = () => (
//   <div>
//     <MyMenuCom />
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
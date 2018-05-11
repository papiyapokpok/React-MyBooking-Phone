import React from 'react'

import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default {
  test() {
    console.log('test function logout')
  },

    // static propTypes(){
    //   history: PropTypes.object,
    // },

  signOut() {    
      var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i];
              var eqPos = cookie.indexOf("=");
              var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
      console.log('Logout')
      this.homePage()
      // window.location.reload()
  },

  homePage() {
      this.props.history.push('/')
      console.log('test onclick menu')
  }

  }
import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import firebase from '../../firebase'


export default class SignOutCom extends Component {

    static propTypes = {
        history: PropTypes.object,
    }

    signOut = () => {    
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
        console.log('Logout Complete')
        this.homePage()
        window.location.reload()
          }).catch(function(error) {
            // An error happened.
            console.log('Error Logout')
          });

        }

    homePage = () => {
        this.props.history.push('/')
        console.log('test onclick menu')
    }
    
        
    render() {
        return(
            <div style={{backgroundColor:'red'}}>
                <button onClick={this.signOut}> SignOut </button>
            </div>
        )
    }
}
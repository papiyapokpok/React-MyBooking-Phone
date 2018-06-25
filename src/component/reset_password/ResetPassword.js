import React, { Component } from 'react'
import HomePageBox from '../HomePageBox'
import ButtonLoginBox from '../button/ButtonLoginBox'
import ResetStyle from './style/ResetStyle.css'
import { PropTypes } from 'prop-types';

import firebase from '../../firebase'
import swal from 'sweetalert'
import { fail } from 'assert';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        if(event.target.id === 'email') {
            this.setState({emails: event.target.value});
        } 
    }

    static PropType = {
        history: PropTypes.object,
    }
    login = () => {
        this.props.history.push('/')
        // window.location.href("/")
    }  

    resetPass = () => {
        const auth = firebase.auth();
        const emails = this.state;
        const emailAddress = emails.emails.toLowerCase();

        auth.sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
            swal({
                title: "success!",
                text: "Please check link for reset password your email",
                icon: "success",
            }) 
            .then(() => {
                this.login()
            })
        }).catch(function(error) {
          // An error happened.
            swal({
                title: "Failed!",
                text: "Cannot reset password, please check internet",
                icon: "warning",
            })
        });
    }

    render() {
        return(
            <div style={{textAlign:'-webkit-center'}}>
            <form>
                <div className="containerHome">
                    <div id={'firebaseui-auth-container'} >
                        <HomePageBox 
                            id="email"
                            // value={this.state.emails}
                            title={'Email'}
                            type="text" 
                            placeholder="Enter Email"
                            onChange={this.handleChange} 
                        /> 
                                                
                        <ButtonLoginBox
                            className={`resetButton`}
                            id="isButtonDisabled"
                            type="button"
                            onClick={this.resetPass}
                            title={`Reset Password`}
                        />
                    </div>
                </div>
            </form>
        </div>
        )
    }
}
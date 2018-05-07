import React, { Component } from 'react'
import HeaderCom from './header/HeaderCom'

import { PropTypes } from 'prop-types';
import request from 'superagent';
import swal from 'sweetalert';
import './StyleHome.css';

export default class ForgetpasswordCom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            change: '',
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.id === 'username') {
            this.setState({username: event.target.value});
            console.log({username: event.target.value})
        } else if(event.target.id === 'password') { 
            this.setState({password: event.target.value});
            console.log({password: event.target.value})
        }
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

    updatePassword = (event) => {
        event.preventDefault();        
        const username = this.state.username
        const password = this.state.password
        const payload = {
            username,
            password,
        }
        request
            .post('http://localhost/oncall/resetPassword.php')
            .set('content-type', 'application/json')
            .send(payload) 
            .end((err, res) => {
                if(res.body.status === false) {
                    swal({
                        title: 'Failed !',
                        text: 'Your cannot change new password.',
                        // timer: 4000,
                        buttons:false
                    })
                } 

                if(res.body.status === true) {
                    swal({
                        title: 'You change password complete !',
                        text: 'Please wait redirect to login again.',
                        // timer: 9000,
                        buttons:false                        
                    })
                    setTimeout(window.location.reload.bind(window.location), 4000);                     
                }
            }, 'json')
    }



    
    
    static PropType = {
        history: PropTypes.object,
    }

    createAcc = () => {
        this.props.history.push('/createAcc')
    }

    closeDialog = () => {
        // window.location.reload();
        this.props.history.push('/')
        
        console.log('Close Dialog')
    }


    render() {

        return (
            <div className="dialogMain" >
                <form style={{marginTop: '89px', marginLeft: '10px', marginRight: '10px'}} className="form" >
                    <div style={{backgroundColor:'white'}} className="containerHome">
                        <p onClick={this.closeDialog} className="closeDialog">x</p>                    

                        <label className="label"><b>Username</b></label>
                        <input id="username" value={this.setState.username} type="text" placeholder="Enter Username"  onChange={this.handleChange} /> 
                        <br />
                        <label className="label"><b>Reset Password</b></label>
                        <input id="password" value={this.setState.password} maxLength="8" type="password" placeholder="Input your new Password (Maximum 8)"  onChange={this.handleChange}/>

                        <button type="button" onClick={this.updatePassword}>Comfirm</button>
                        <button type="button" className="cancelbtn">Clear</button>
                        
                    </div>
                </form>
            </div>
        )
    }
}
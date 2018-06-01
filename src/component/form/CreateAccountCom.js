import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import request from 'superagent';
import swal from 'sweetalert';

export default class CreateAccountBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            surname: '',
            nickname: '',            
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        if(event.target.id === 'id') {
            this.setState({id: event.target.value})
        } else if(event.target.id === 'username') {
            this.setState({username: event.target.value})           
        } else if(event.target.id === 'surname') {
            this.setState({surname: event.target.value})           
        } else if(event.target.id === 'nickname') {
            this.setState({nickname: event.target.value})          
        } else if(event.target.id === 'email') {
            this.setState({email: event.target.value})           
        } else if(event.target.id === 'password') {
            this.setState({password: event.target.value})           
        }
    }

    createAccountToSql = (event) => {
        event.preventDefault();
        const id = this.state.id;
        const username = this.state.username;
        const surname = this.state.surname;
        const nickname = this.state.nickname;
        const email = this.state.email;
        const password = this.state.password;
        
        if( id === null ) {
            alert('Please input staff id!')
            return;
        }
        
        const payload = {
            id,
            username,
            surname,
            nickname,
            email,
            password,
        }
        request
            .post('http://172.25.11.98/oncall/createAcc.php')
            .set('content-type', 'application/json')
            .send(payload)
            .end((err, res) => {
                if(res.body.status === false) {
                    swal({
                        title: 'Faled !',
                        text: 'Account you ready!',
                        timer: 4000,
                        buttons: false

                    })
                } else {
                    swal({
                        title: 'Welcome to myOncall !',
                        text: username + ' ' +surname,
                        timer: 4000,
                        buttons: false
                    }), 3000
                    this.props.history.push('/')
                }
            })
    }


    //ลิ้งที่จะไปหน้าอื่น
    static PropType = {
        history: PropTypes.object,
    }

    cancelToHome = () => {
        this.props.history.push('/')
    }


    render() {
        return(
            <div>
                <form className=""createAcc>
                    <div className="containerHome">
                        <label className="label"><b>Employee Id</b></label>
                        <input id="id" value={this.setState.id} type="text" placeholder="Enter Employee Id" maxLength="5" onChange={this.handleChange} /> 
                    <br />
                    <label className="label"><b>Username</b></label>
                        <input id="username" value={this.setState.username} type="text" placeholder="Enter Username"  onChange={this.handleChange} /> 
                    <br />
                    <label className="label"><b>Surname</b></label>
                        <input id="surname" value={this.setState.surname} type="text" placeholder="Enter Surname"  onChange={this.handleChange} /> 
                    <br />
                    <label className="label"><b>Nickname</b></label>
                        <input id="nickname" value={this.setState.nickname} type="text" placeholder="Enter Nickname"  onChange={this.handleChange} /> 
                    <br />
                    <label className="label"><b>Email</b></label>
                        <input id="email" value={this.setState.email} type="text" placeholder="Enter Email"  onChange={this.handleChange} /> 
                    <br />
                        <label className="label"><b>Password</b></label>
                        <input id="password" value={this.setState.password} type="password" placeholder="Enter Password" maxLength="8" onChange={this.handleChange}/>

                        <button type="button" onClick={this.createAccountToSql}>Create Account</button>
                        <button type="button" onClick={this.cancelToHome}className="cancelbtn">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
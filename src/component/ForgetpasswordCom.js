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
        } else if(event.target.id === 'password') { 
            this.setState({password: event.target.value});
        }
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
            .post('http://172.25.11.98/oncall/resetPassword.php')
            .set('content-type', 'application/json')
            .send(payload) 
            .end((err, res) => {

                if(res.body.status == true) {
                    swal({
                        title: 'You change password complete !',
                        text: 'Please login again.',
                        icon: "success",
                        buttons: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            this.setTimeout()
                        } else {
                            this.setTimeout()                                                
                        }
                      });
                } else if(res.body.status == false) {
                    swal({
                        title: 'Failed !',
                        text: 'No Account !',
                        // timer: 4000,
                        buttons:false
                    })
                } 
            }, 'json')
    }

    setTimeout = () => {
        window.location.href = "/"; 
    };

    
    
    static PropType = {
        history: PropTypes.object,
    }

    createAcc = () => {
        this.props.history.push('/createAcc')
    }

    closeDialog = () => {
        // window.location.reload();
        this.props.history.push('/')
    }


    render() {
        // const { staff_name } = this.getCookie('staff_name') 

        return (
            <div className="dialogMain" >
                <form style={{marginTop: '89px', marginLeft: '10px', marginRight: '10px'}} className="form" >
                    <div style={{backgroundColor:'white'}} className="containerHome">


                        <label className="label"><b>Username</b></label>
                        <input id="username" value={this.setState.username} type="text" placeholder="Input your account" onChange={this.handleChange}/> 

                        <br />
                        <label className="label"><b>Reset Password</b></label>
                        <input id="password" value={this.setState.password} maxLength="8" type="password" placeholder="Input your new Password (Maximum 8)"  onChange={this.handleChange}/>

                        <button type="button" onClick={this.updatePassword}>Comfirm</button>
                        <button type="reset"  className="cancelbtn">Clear</button>
                        
                    </div>
                </form>
            </div>
        )
    }
}
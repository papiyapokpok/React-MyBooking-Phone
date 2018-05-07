import React, { Component } from 'react'
import HeaderCom from './header/HeaderCom'
import ForgetpasswordCom from './ForgetpasswordCom';

import { PropTypes } from 'prop-types';
import request from 'superagent';
import swal from 'sweetalert';
// import './StyleHome.css';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainDialogReset: false,            
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        // this.passwordWrong = this.passwordWrong.bind(this);
    }

    componentDidMount() {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            this.loginSuccess()
        } else {
            this.notLogin()
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
        return null;                       
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

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        // console.log(cvalue)
    }

    login = (event) => {
        event.preventDefault();        
        const username = this.state.username
        const password = this.state.password
        const payload = {
            username,
            password,
        }
        request
            .post('http://localhost/oncall/login.php')
            .set('content-type', 'application/json')
            .send(payload) 
            .end((err, res) => {
                console.log(res)

                if(res.body.change === true) {
                    swal({
                        title: 'You first login !',
                        text: 'Please change new password.',
                        timer: 4000
                    })
                    .then(() => {
                        this.dialog({})
                        console.log('Change')        
                    });
                }
                
                else if(res.body.status === false) {
                    swal({
                        title: 'Login Failed !',
                        text: 'Your password is wrong !',
                        timer: 4000,
                        buttons:false
                    })
                } 

                else if(res.body.status === true) {
                    this.setCookie('staff_name', username, 1 )                    
                    this.loginSuccess({})
                }
            }, 'json')
    }

    dialog = () => {
        this.setState({
            mainDialogReset: !this.state.mainDialogReset
        })
        console.log('Password is Wrong');
    }

    resetForm = (payload) => { 
        this.setState({
            password:''
        })
        console.log('reset form');
    }
    
    
    static PropType = {
        history: PropTypes.object,
    }

    createAcc = () => {
        this.props.history.push('/createAcc')
    }

    loginSuccess = () => {
        this.props.history.push('/menu')
    }

    resetPassword = () => {
        this.props.history.push('/resetpassword')
    }


    loginSuccess = () => {
        this.props.history.push('/menu')
    }
    
    notLogin = () => {
        this.props.history.push('/')
    }
    

    render() {
        const { mainDialogReset } = this.state
        const {...res } = this.props

        let dialogChangePassword = ''
        let classHide = ''
        let classShow = 'hide'

        if(mainDialogReset) {
            dialogChangePassword = <ForgetpasswordCom {...this.props} /> 
        }

        return (
            <div>
                <form >
                    <div className="containerHome">
                        <label className="label"><b>Username</b></label>
                        <input id="username" value={this.setState.username} type="text" placeholder="Enter Username" onChange={this.handleChange} /> 
                        <br />
                        <label className="label"><b>Password</b></label>
                        <input id="password" value={this.setState.password} type="password" placeholder="Enter Password" maxLength="8" onChange={this.handleChange}/>

                        <button type="button" onClick={this.login}>Login</button>
                        <button type="button" className="cancelbtn">Cancel</button>
                        <div className="createAccount">
                            <p onClick={this.createAcc}>Create account</p>                          
                        </div>
                        {/* <div className="forgetPassword">
                            <p onClick={this.resetPassword}>Forget password</p>  
                        </div> */}

                        <div>
                            {dialogChangePassword}
                        </div>
                        
                    </div>
                </form>
            </div>
        )
    }
}
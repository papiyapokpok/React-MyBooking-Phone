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
            isButtonDisabled: false,
            clicks: 0
        }
        this.handleChange = this.handleChange.bind(this);
        // this.passwordWrong = this.passwordWrong.bind(this);
    }

    handleClick = () => {
        const clicks = this.state.clicks
    	this.setState((prevState) => ({
      	   clicks: prevState.clicks + 1
        }));
        console.log(this.state.clicks)
        this.setCookieLogin('login_time', clicks, 1)

        console.log(this.getCookieLogin('login_time'))

        if(this.getCookieLogin('login_time') >= 2) {

            document.getElementById("isButtonDisabled").disabled = true;
            this.loginFailed()
        }
    }

    setCookieLogin = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        // console.log(cvalue)
    
    }

    getCookieLogin = (cname) => {
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

    loginFailed = () => {
        console.log('login_time')
        // alert("You exceeded wrong your password!, \n Please contact admin!")
        swal({
            title: 'You exceeded wrong your password!',
            text: 'Please contact admin!',
            timer: 4000
        })

    }
    
    componentDidMount() {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            this.loginSuccess()
        } else {
            this.notLogin()
        }
    }

    // onLaunchClicked = (event) => {
    //     // event.preventDefault();
    //     this.setState({
    //         isButtonDisabled: true
    //     });
    //     console.log('dissssssss')
    //     // **** here's the timeout ****
    //     setTimeout(() => this.setState({ isButtonDisabled: false }), 7000);

    // // return this.props.onLaunchClicked();
    // }

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
            .post('http://172.25.11.98/oncall/login.php')
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

                else if(res.body.status === true) {
                    this.setCookie('staff_name', username, 1 )                    
                    this.loginSuccess({})
                }
                
                else if(res.body.status === false) {
                    this.handleClick()
                    if(this.getCookieLogin('login_time') == 0 ) {
                        swal({
                            title: 'Incorect password!',
                            // text: 'You have 1 time remaining!',
                            icon: "warning",
                            timer: 40000,
                            dangerMode: true,

                        })
                        return;
                    }

                    else if(this.getCookieLogin('login_time') == 1) {
                        swal({
                            title: 'Incorect password!',
                            text: 'You have 1 time remaining!',
                            icon: "warning",
                            timer: 40000,
                            dangerMode: true,

                        })
                        return;
                    }

                    else if(this.getCookieLogin('login_time') >= 2) {
                        swal({
                            title: 'You exceeded wrong your password!',
                            text: 'Please contact admin!',
                            icon: "warning",
                            timer: 40000,
                            dangerMode: true,
                            buttons:false,
                        })
                        return;
                    }
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
        this.props.history.push('/MyMenuCom')
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
        let sample = this.state
        let dialogChangePassword = ''
        let classHide = ''
        let classShow = 'hide'

        if(mainDialogReset) {
            dialogChangePassword = <ForgetpasswordCom username={this.state.username} /> 
        }

        return (
            <div>
                <form >
                    <div className="containerHome">
                        <label className="label"><b>Username</b></label>
                        <input id="username" value={this.state.username} type="text" placeholder="Enter Username" onChange={this.handleChange} /> 
                        <br />
                        <label className="label"><b>Password</b></label>
                        <input id="password" value={this.state.password} type="password" placeholder="Enter Password" maxLength="8" onChange={this.handleChange}/>

                        <button id="isButtonDisabled" type="button" onClick={this.login}>Login</button>
                        {/* <button type="button" className="cancelbtn">Cancel</button>
                        <div className="createAccount">
                            <p onClick={this.createAcc}>Create account</p>                          
                        </div> */}
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
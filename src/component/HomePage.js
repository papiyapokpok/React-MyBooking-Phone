import React, { Component } from 'react'
import HeaderCom from './header/HeaderCom'
import ForgetpasswordCom from './ForgetpasswordCom'
import HomePageBox from './HomePageBox'
import ButtonLoginBox from './button/ButtonLoginBox'

import { PropTypes } from 'prop-types';
import request from 'superagent';
import swal from 'sweetalert';
import './StyleHome.css'
import glogin from './assets/imgs/glogin.png'

import firebase from '../firebase'
import firebaseui from 'firebaseui'
import App from '../App';
import OncallBookingCom from './form/OncallBookingCom';
// import './StyleHome.css';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {          
            mainDialogReset: false,            
            email: '',            
            password: '',
            isButtonDisabled: false,
            clicks: 0,
            menu: false,
            error: '', 
            load: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.id === 'email') {
            this.setState({email: event.target.value});
            console.log({email: event.target.value})
        } else if(event.target.id === 'password') { 
            this.setState({password: event.target.value});
            console.log({password: event.target.value})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
          title: this.state.username,
          user: this.state.password
        }
        itemsRef.push(item);
        this.setState({
            username: '',
            password: ''
        });
    }  

    loginGoogle = () => {
        this.setState({ error: '', load: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ error: '', load: true });
            this.setCookieLogin('staff_name', email, 1) 
            this.loginSuccess()
            this.setState({load: false}) 
        }) 
        .catch(() => {
            swal('Password is wrong')
            this.setState({load: false})
        });
    }

    componentDidMount = () => {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            this.loginSuccess()
        } else {
            this.notLogin()
        }
    }

    static PropType = {
        history: PropTypes.object,
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
        console.log(cvalue)
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
        swal({
            title: 'You exceeded wrong your password!',
            text: 'Please contact admin!',
            timer: 4000
        })

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
    
    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        // console.log(cvalue)
    }

    dialog = () => {
        this.setState({
            mainDialogReset: !this.state.mainDialogReset
        })
    }

    resetForm = (payload) => { 
        this.setState({
            password:''
        })
    }
    


    createAcc = () => {
        this.props.history.push('/createAcc')
    }

    loginSuccess = () => {
        this.props.history.push('/home')
    }

    resetPassword = () => {
        this.props.history.push('/resetpassword')
    }
    
    notLogin = () => {
        this.props.history.push('/')
    }    

    render() {
        const { mainDialogReset, menu, load} = this.state
        const {...res } = this.props
        const loadingStyle = {
            position: 'absolute',
            paddingTop: '50%',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex:'999'
        }
        let sample = this.state
        let dialogChangePassword = ''
        let classHide = ''
        let classShow = 'hide'

        let menuView = ''
        let loading = ''
        if(load) {
            loading = <h2 style={loadingStyle}>Now loading...</h2>
        }
        
        if(mainDialogReset) {
            dialogChangePassword = <ForgetpasswordCom username={this.state.username} /> 
        }

        return (
            <div>
                {loading}
                <form >
                    <div className="containerHome">
                        <div id={'firebaseui-auth-container'} >
                            <HomePageBox
                                id="email"
                                value={this.state.email}
                                title={'Email'}
                                type="text" 
                                placeholder="Enter Email"
                                onChange={this.handleChange} />
                            <HomePageBox
                                id="password"
                                value={this.state.password}
                                title={'Password'}
                                type="password" 
                                placeholder="Enter Password"
                                maxLength="8"
                                onChange={this.handleChange} />
                            
                            <ButtonLoginBox
                                id="isButtonDisabled"
                                type="button"
                                onClick={this.loginGoogle}
                                title={'Signin'}/>
                        </div>
                        <div>
                            {dialogChangePassword}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
import React, { Component } from 'react';

import MainMenuBox from './MainMenuBox';
import { PropTypes } from 'prop-types';

export default class MainMenuCom extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: true
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
    
    static propTypes = {
        history: PropTypes.object,
    }

    index = () => {
        this.props.history.push('/')
        console.log('test onclick menu')
    }

    oncallBook = () => {
        this.props.history.push('/menu')
        console.log('Menu list to Booking')
    }

    search = () => {
        this.props.history.push('/search')
    }


    signOut = () => {    
    var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            this.index({})
        }
    console.log('Logout')
    }


    render() {
        const staff_name = this.getCookie('staff_name')
        const { menu } = this.state
        // let menu = ''
        // if(menu) {
        //     menu = false
        // }
        

        return(
            <div className="main-listMenu" onClick={this.props.menuListClick}>
                {/* <p>x</p> */}
                <div className="listMenu" >
                    <div className="cname_ListMenu">
                        <p>{staff_name}</p>
                    </div>
                    <br /><br /><br />
                    <MainMenuBox  title={'- OnCall'} onClick={this.oncallBook}/>
                    <MainMenuBox  title={'- Report'} onClick={this.search}/> 
                    <p className="menuDivMain" onClick={this.signOut}>- Logout</p>
                     
                <br />
            
                </div>
            </div>
        )
    }
}
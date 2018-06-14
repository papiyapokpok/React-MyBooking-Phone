import React, { Component } from 'react';

import HeaderBox from './HeaderBox';
import logo from '../assets/imgs/Kaidee-logo.png';

import { PropTypes } from 'prop-types';

export default class HeaderCom extends Component {

        
    static propTypes = {
        history: PropTypes.object,
    }

    home = () => {
        this.props.history.push('/menu')
    }

    homePage = () => {
        this.props.history.push('/')
    }

    search = () => {
        this.props.history.push('/search')
    }

    

    render() {
        return(
            <div>
                <HeaderBox image={logo}/>
            </div>
        )
    }
}
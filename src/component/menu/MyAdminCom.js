import React, { Component } from 'react'
import CreateAccountCom from '../form/CreateAccountCom'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class MyAdminCom extends Component {
    constructor(props) {
        super(props);
        this.setState = {

        }
    }

    toCreatAcc = () => {
        window.location.href = "localhost:3000/createacc"
        console.log(this.props)
    }

    render() {
        const {...res} = this.props
        console.log(this.props)
        return(
            // <Route  {...res}>
                <div>
                    <p onClick={this.toCreatAcc} >Create Account</p> 
                    

                    {/* <Route path="/createacc" component={CreateAccountCom} {...res}/> */}
                    
                </div>
            // </Route>
        )
    }
}
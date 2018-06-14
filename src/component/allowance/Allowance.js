import React, { Component } from 'react'

import AllowanceChild from './child/AllowanceChild'

export default class Allowance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            choose: 'Month',
            menu: false,            
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            bath:'',
            print: true,
            views: true,
        }
    }

    setFocusState = (focus) => {
        this.setState({
            
        })
    }


    render() {
        return(
            <div>
                <AllowanceChild 
                    {...this.state}
                />
            </div>
        )
    }
}
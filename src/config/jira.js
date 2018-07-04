import React, { Component } from 'react'

import request from 'superagent'

export default class Jira extends Component {


    jiraGet = () => {
        request
            .get('/https://jira.24x7th.com')
            .query({ query: 'Manny' })
            .query({ range: '1..5' })
            .query({ order: 'desc' })
            .then(function(e) {
                console.log(e)
                // console.log(res.text)
            });
    }

    render() {
        return(
            <div>
                <p onClick={this.jiraGet} >Test</p>
            </div>
        )
    }
}




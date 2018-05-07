import React, { Component } from 'react';
import './StyleAlert.css'


export default class AlertNull extends Component {
    render() {

        const list = this.props.title.map((e, i) => {
            return <p key={i}>{e}</p>
        })

        // const list = []
        // this.props.title.forEach((e, i) => {
        //     list.push(<p key={i}>{e}</p>)
        // })
        // const list = []
        // for(let i=1; i<this.props.title.length; i++) {
        //     list.push(<p key={i}>{e}</p>)
        // }

        return(
            <div className="AlertDialog">
                <div className="Contain">
                    <a onClick={this.props.clickClose} className="Close">Close x &nbsp;</a> <br />
                    {list}
                </div>
            </div>
        )
    }
}
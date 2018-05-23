import React, { Component } from 'react'

import kdLogo from '../assets/imgs/Kaidee-logo.png'
import bell from '../assets/imgs/bell.png'
import chat from '../assets/imgs/chat.png'
import login from '../assets/imgs/login.png'


import './StyleMenuTest.css'


export default class MenuTest extends Component {
    render() {
        return(
            <div style={{ width:'100%', height:'100%'}}>
            <div className="divContain">
                <div style={{backgroundColor:'white', width:'20%',float:'left',height: '40px'}}>
                    <img className="kdLogo" src={kdLogo}></img>
                </div>
                <div className="right">
                    <img id="bell" className="bell" src={bell}></img><label className="labellBell" for="bell" >แจ้งเตือน</label>
                    <img id="chat" className="chat" src={chat}></img><label className="labellChat" for="bell" >พูดคุย</label>  
                    <label className="login" for="login" >เข้าสู่ระบบ</label> 
                    <label className="or" for="or" >หรือ</label>  
                    <label className="sigin" for="sigin" >สมัครสมาชิก</label> 
                    <div className="divSell">
                    <label className="sell" for="sell" >ขาย</label> 
                    </div> 
                </div>
            </div>
            </div>
            

        )
    }
}


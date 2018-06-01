import React, { Component } from 'react'
import swal from 'sweetalert';

import print from '../assets/imgs/print.png'
import { setTimeout } from 'timers';


export default class PrintCom extends Component {
    

    setCookiePrint = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    printReport = () => {
        this.setCookiePrint('print_status', 'print', 1)
        window.print();
        // this.afterPrint()
    }

    afterPrint = () => {   
        window.location.href = "/adminmenu"         
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = 'print_status=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }


    render() {

    const printStyle = {
        width: '30px',
        position: 'absolute',
        right: '45px',
        top: '144px'
    }
        return(
            <div>
                <div>
                    <img src={print} alt="print" style={printStyle} onClick={this.printReport}/>
                </div> 
            </div>
        )
    }
}
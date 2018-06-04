import React, { Component } from 'react'

import request from 'superagent';
import swal from 'sweetalert';
import moment, { now } from 'moment';

import firebase from '../../firebase'

export default class DataMigrate extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data: ''
        }
    }

    getDataSql = () => {
        request
        .post('http://172.25.11.98/oncall/searchDate.php')
        .set('content-type', 'applecation/json')
        // .send(payload)
        .end((err, res) => {
                // console.log(payload)
            if(res.body.status === false) {
                console.log('No Data')
            }
            this.setState({data: res.body})
        })
    }

    dataRender = (data) => {
        // var db = firebase.firestore();
        
        // data.forEach((result) => {
        //     // console.log(result)
        //     const numberSql = result.oncallnumber
        //     const dateSql = result.oncalldate 
        //     // dateSql.setHours(1, 1, 1)
        //     const emailSql = result.email
        //     const staffidSql = result.staffid
        //     const staffNameSql = result.staffName
        //     const staffNickNameSql = result.staffNickName
        //     const staffSurnameSql = result.staffSurname
            
        //     // const date = moment(dateSql).format('LLL')

        //     // let date = moment(dateSql).format('YYYY/MM/DD h:mm:ss')
        //     // const sss = (new Date(date).getTime()/1000)

        //     const start = new Date(dateSql);
        //     // start.setHours(0, 0, 0, 0);

        //     // start.setHours(12, 0, 0, 0);
        //     // console.log(numberSql)
        //     console.log(start)
        //     // console.log(emailSql)


        //     db.collection("oncalllogs").add({
        //         oncallnumber: numberSql,
        //         email: emailSql,
        //         id: staffidSql,
        //         name: staffNameSql,
        //         nickname: staffNickNameSql,
        //         surname: staffSurnameSql,
        //         dateTime: start
        //     })
        //     // .then((docRef) => {
        //     //     // swal({
        //     //     //     title: 'Complete',
        //     //     //     text: "You booking oncall done",
        //     //     //     icon:'success'
        //     //     // })
        //     //     // .then((willDelete) => {
        //     //     //     if (willDelete) {
        //     //     //         this.setState({load: false})
        //     //     //     }
        //     //     // })
        //     // })
        //     // .catch((error) => {
        //     //     // console.error("Error adding document: ", error);
        //     //     // swal({
        //     //     //     title: 'Failed',
        //     //     //     text: "This device has already been reserved.",
        //     //     //     icon: "warning",
        //     //     // })
        //     //     // .then((willDelete) => {
        //     //     //     if (willDelete) {
        //     //     //         this.setState({load: false})
        //     //     //     }
        //     //     // })
        //     // });
        // });
    }

    render() {

        // const { data } = this.state
        // let dataValue = '';
        // if(data) {
        //     dataValue = this.dataRender(data);
        // }


        return(
            <div>
                <button style={{width: '80%'}} onClick={this.getDataSql}>Dada to Mirgation</button>
            </div>
        )
    }
}
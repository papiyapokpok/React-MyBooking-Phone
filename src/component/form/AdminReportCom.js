import React, { Component } from 'react'

import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import swal from 'sweetalert';

import ButtonBookBox from '../button/ButtonBookBox'
import firebase from '../../firebase';

export default class AdminReportCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'sretthakan.t@kaidee.com',
            startDate: null,
            endDate: null,
            data: [],
        }
        this.handleChange =this.handleChange.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    handleChange = (event) => {
        this.setState({email: event.target.value})        
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.startDate);
        alert('A name was submitted: ' + this.state.endDate);
        event.preventDefault();
    } 

    getData = () => {
        const db = firebase.firestore();
        
        const email = this.state.email
        const start = new Date(this.state.startDate)
        start.setHours(0, 0, 0)
        const end = new Date(this.state.endDate)
        end.setHours(23, 59, 59)
        console.log(email)
        console.log(start)
        console.log(end)

        if(start, end) {
            db.collection("testLogs") 
            .where('dateTime', '>', start)
            .where('dateTime', '<', end)             
            .where('email', '==', email)             
            .onSnapshot((querySnapshot) => {
                const data = [];

                // console.log(querySnapshot.docs[0].id)
                // console.log(querySnapshot.docs[0].key.path.segments[7])
                
                
                if(querySnapshot.size > 0) {
                    querySnapshot.forEach((querySnapshot) => {
                        data.push(querySnapshot.data())   
                        console.log(data)
                                             
                    });
                    this.setState({data})
                    this.setState({load: false})
                } else {
                    swal('No booking on search')
                    this.setState({load: false})                
                } 
            });
        }
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <tr id={'result'} key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)'}}>
                    <td>{e.oncallnumber}</td>
                    <td>{moment(e.dateTime).format('Y-MM-DD')}</td>
                    <td style={{textAlign:'center'}}>{e.email}</td>
                    <td style={{textAlign:'center'}} onClick={() => this.onClickDelete(e)}>{'Del'}</td>
                </tr>
            );            
        }); 
    }



    onClickDelete = (data) =>{
        // const items = e.email
        // console.log(data)
        console.log(data)


        let email = data.email        

        const db = firebase.firestore()
        db.collection('testLogs').doc(email).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    deleteItem = (id) => {
        const db = firebase.firestore();        
        console.log(id)
        // this.itemsRef.update({
        //   [id]: null

        // })
    }

    render() {
        const { data } = this.state

        const inputEmail = {
            fontSize: '16px',
            width: '230px',
            height: '32px',
            paddingLeft: '8px',
            border: '1px solid gray',
            textAlign: 'center'
        }
        const tableHeader ={
            border:'1px solid', 
            backgroundColor:'rgb(25, 169, 241)',
            paddingLeft:'4px'
        };

        let dataValue = '';
        let rowCount = 'Total: 0';
        if (data) {
            dataValue = this.dataRender(data);
            // rowCount = `Total:  ${data.length} `;  //วิธีการต่อ String
        } 
        return(
            <div>
                <br />
                <DateRangePicker 
                        orientation="horizontal" 
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }) } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} 
                        isOutsideRange={() => false}
                        numberOfMonths={1}
                        withFullScreenPortal
                />
                <br />
                <br />
                <input style={inputEmail} type={'text'} value={this.setState.email} placeholder={'Email for search'} onChange={this.handleChange}  ></input>

                <div>
                    <ButtonBookBox className="Search-Button" onClick={this.getData} title={'Search'} />
                </div>

                <div className="divTable">
                    <table className="tebleStyle" style={{border:'1px solid'}}>
                        <thead>
                            <tr>
                                <th id={'num'} style={tableHeader}>Oncall</th>
                                <th id={'date'} style={tableHeader}>Date</th> 
                                <th id={'account'} style={tableHeader}>Account</th>
                                <th id={'status'} style={tableHeader}>Status</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {dataValue}
                        </tbody>                            
                    </table>
                </div><br />
                
            </div>
        )
    }
}
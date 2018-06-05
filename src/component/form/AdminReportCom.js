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
            email: null,
            startDate: null,
            endDate: null,
            data:null,
            load:false,
            noData:false
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
        console.log('Get Data')
        this.setState({load: true})                
        
        const db = firebase.firestore();
        
        const email = this.state.email
        const start = new Date(this.state.startDate)
        start.setHours(0, 0, 0)
        const end = new Date(this.state.endDate)
        end.setHours(23, 59, 59)
// console.log(email)
        if(start, end) {          
            db.collection("oncalllogs") 
            .where('dateTime', '>=', start)
            .where('dateTime', '<=', end)             
            .where('email', '==', email)             
            .onSnapshot((querySnapshot) => {
                const data = [];
                console.log('Get data 2')
                if(querySnapshot.size > 0) {
                    querySnapshot.forEach(querySnapshot => {
                        data.push(Object.assign(querySnapshot.data(), { id: querySnapshot.id })) //Merge Object
                    })
                    this.setState({data})
                    this.setState({load: false})
                    this.setState({noData: false})
                } else {
                    this.setState({load: false}) 
                    this.setState({data: null})                                    
                    this.setState({noData: true})
                } 
            });
        } else {
            console.log('no start end')
            this.setState({noData: false})
        }
    }

    dataRender = (data) => {
        return data.map((e, i) => {        
            return (
                <tr id={'result'} key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)', lineHeight:'20px'}}>
                    <td>{e.oncallnumber}</td>
                    <td>{moment(e.dateTime).format('Y-MM-DD')}</td>
                    <td style={{textAlign:'center'}}>{e.email}</td>
                    <td style={{textAlign:'center'}} onClick={() => this.onClickDelete(e.id)}>{'Del'}</td>
                </tr>
            );  
        }); 

    }

    onClickDelete = (id) =>{
        const db = firebase.firestore();
        this.setState({load: true})                

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                db.collection('oncalllogs').doc(id).delete().then(function() {
                    // console.log("Document successfully deleted!");
                    swal("Document successfully deleted!")
                }).catch(function(error) {
                    // console.error("Error removing document: ", error);
                    swal("Document cannot deleted!")        
                });
            } else {
              swal("Your imaginary file is safe!");
            }
          });


    }


    render() {
        const { data, load, noData } = this.state
        // console.log(data)
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

        let loading = ''
        if(load) {
            loading = <h3>Now loading...</h3>
        }
        let noDataView = ''
        if(noData) {
            noDataView = <h3>No data...</h3>
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
                {loading}{noDataView}
                
            </div>
        )
    }
}
import React, { Component } from 'react'

import print from '../../assets/imgs/print.png'

import { DateRangePicker } from 'react-dates'

import '../style/AllowanceStyle.css'

export default class Allowance extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { startDate, endDate, data, menu, cells, views, hide } =this.props  
        console.log(this.props.hide)
        let dataValue = '';
        let dataSum = '';
        let sumValue = 0
        let rowCount = 'Total: 0 Day' ;
        let sumCount = 'Sum:   0.  Bath';
        let classHide = '';
        // let menu = ''
    if(data) {
        dataValue = this.props.dataRender(data);
        rowCount = 'Total: ' + data.length + ' Day';

        sumValue = data.length*500
        sumCount = 'Sum: ' + sumValue.toLocaleString(navigator.language, { minimumFractionDigits: 0 })  + ' Bath.'
    }
    // if (this.state.hide) {
    //     classHide = 'hide'
    // }
    
    let viewer = ''
    if(dataValue){
        viewer = (                
            <div style={{paddingTop:'-40px'}}>            
                <h2 style={{paddingTop:'0px', marginTop:'-8px'}}>On Call Allowance Request Form</h2>     
            </div>
        )
    } else {
        viewer = (
            <div style={{marginTop:'-50px'}}>
  
                <img src={print} alt="print" className={'printStyle'} onClick={this.props.getData}/>
                <br />
                <div className={'chooseMonth'}>
                    {/* <p onClick={this.props.show} >{this.state.choose}</p> */}
                    <DateRangePicker 
                        orientation="horizontal" 
                        startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.props.setDateTime(startDate, endDate) } // PropTypes.func.isRequired,
                        focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.props.setFocusState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} 
                        isOutsideRange={() => false}
                        numberOfMonths={1}
                        withFullScreenPortal
                    />                    
                </div>
            </div>
        )
    }
 
        return(
            <div className={'AllowDivMain'}>
                <br />
                <br />
                <div className="divTable" >{viewer}<div>
                        <table className="table-header" >
                            <thead>
                                <tr>
                                    <th className={'tableHeader'}>{'Date'}</th>
                                    <th className={'tableHeader'}>{'ID'}</th>
                                    <th className={'tableHeader'}>{'Name'}</th>
                                    <th className={'tableHeader'}>{'Nickname'}</th> 
                                    <th className={'tableHeader'}>{'Surname'}</th>                                
                                    <th className={'tableHeader'}>{'Allowance(THB)'}</th>
                                </tr>
                            </thead>
                            <tbody>{dataValue}</tbody>             
                        </table>
                    </div>
                    <div style={{width:'90%'}}>
                        <div className={'AllowRowCount'}>{rowCount}</div>
                        <div className={'AllowSumCount'}>{sumCount}</div>
                    </div>
                </div>                
            </div> 

        )
    }
}

const listMonth = {
    position: 'fixed',
    top: '265px',
    left: '30.3%',
    backgroundColor: 'rgb(253, 253, 253)',
    listStyle: 'none',
    paddingLeft: '0px',
    marginTop: '0.5px',
    width: '200px',
    textAlign: 'left'
}
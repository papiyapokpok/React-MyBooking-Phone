import React, { Component } from 'react'

import print from '../../assets/imgs/print.png'

import { DateRangePicker } from 'react-dates'

import '../style/AllowanceStyle.css'

export default class Allowance extends Component {
    render() {
        // const { ...res } = this.props

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
        dataValue = this.dataRender(data);
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
  
                <img src={print} alt="print" className={'printStyle'} onClick={this.getData}/>
                <br />
                <div className={'chooseMonth'}>
                    {/* <p onClick={this.show} >{this.state.choose}</p> */}
                    {/* <DateRangePicker 
                        orientation="horizontal" 
                        startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        minimumNights={0} 
                        isOutsideRange={() => false}
                        numberOfMonths={1}
                        withFullScreenPortal
                    />                     */}
                </div>
            </div>
        )
    }
 
        return(
            <div style={{backgroundColor:'white'}}>
                <br />
                <br />
                <br />
                <div id="divToPrint" className="SupperMainDiv superMainDiv" >{viewer}<div>
                        <table className="tebleStyle" style={{border:'1px solid', marginTop:'40px'}}>
                            <thead>
                                <tr>
                                    <th className={'tableHeader'}>Date</th>
                                    <th className={'tableHeader'}>ID</th>
                                    <th className={'tableHeader'}>Name</th>
                                    <th className={'tableHeader'}>Nickname</th> 
                                    <th className={'tableHeader'}>Surname</th>                                
                                    <th className={'tableHeader'}>Allowance(THB)</th>
                                </tr>
                            </thead>
                            <tbody>{dataValue}</tbody>             
                        </table>
                    </div>
                    <div style={{width:'90%'}}>
                        <div style={{textAlign:'left', padding:'18px', marginLeft:'-23px', width:'40%', float:'left'}}>{rowCount}</div>
                        <div style={{textAlign:'right', padding:'18px', marginRight:'-27px', width:'40%', float:'right'}}>{sumCount}</div>
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
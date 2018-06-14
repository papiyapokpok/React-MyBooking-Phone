import React, { Component } from 'react'

import { DateRangePicker } from 'react-dates';

import ButtonBookBox from '../../button/ButtonBookBox'
import '../style/AdSearchingStyle.css'

export default class AdSearchingChild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { startDate, endDate, data, menu, load, emailSearch } = this.props
    
        let loading = ''
        if(load) {
            loading = `Now loading...`
        }
    
        let dataValue = '';
        let rowCount = 'Total: 0';
        if (data) {
            dataValue = this.props.dataRender(data);
            rowCount = `Total:  ${data.length} `;  //วิธีการต่อ String
        }

        return(
            <div>
                <br />
                <div>
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
                <br />
                <input 
                    className={'inputEmailSearch'} 
                    type={'Text'} 
                    placeholder={'Input email or null for all'}
                    id="searchEmail"
                    onChange={this.props.handleChange}
                    // value={this.props.emailSearch}
                />
                <div>
                    <ButtonBookBox className="Search-Button" onClick={this.props.onCallSearch} title={'Search'} />
                </div>

                <div className="divTable">
                    <table className="AdTableHeader" >
                        <thead>
                            <tr>
                                <th className={'AdTableHeader1'}>Oncall</th>
                                <th className={'AdTableHeader2'}>Date</th> 
                                <th className={'AdTableHeader3'}>Account</th>
                                <th className={'AdTableHeader4'}>Status</th>
                            </tr>
                        </thead>
                        <tbody>{dataValue}</tbody>                            
                    </table>
                </div><br />{loading}
                <div className={'rowCount'}>{rowCount}</div>
            </div> 
        )
    }
}
import React, { Component } from 'react'

import { DateRangePicker } from 'react-dates';

import ButtonBookBox from '../../button/ButtonBookBox'
import '../style/searchingStyle.css'
import '../../main_style/react_dates_overrides.css'

export default class SearchingChild extends Component {
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
                        withFullScreenPortal />
                </div>
                <div>
                    <ButtonBookBox className="Search-Button" onClick={this.props.onCallSearch} title={'Search'} />
                </div><br />
                <div className="divTable">
                    <table className="table-header" >

                                <th className={'tableHeader'}>Oncall</th>
                                <th className={'tableHeader'}>Date</th> 
                                <th className={'tableHeader'}>Account</th>

                        <tbody>{dataValue}</tbody>                            
                    </table>
                </div><br />
                {loading}
                <div className={'rowCount'}>{rowCount}</div>
            </div> 
        )
    }
}
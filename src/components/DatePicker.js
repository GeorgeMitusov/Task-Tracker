import React from 'react';
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({ date, setDate }) => {
  return (
    <ReactDatePicker
        selected={date}
        onChange={ date => setDate(date)}
        timeInputLabel="Time:"
        timeFormat='HH:mm'
        dateFormat="MM d, yyyy h:mm aa"
        showTimeInput
        closeOnScroll={true}
        isClearable
        showYearDropdown
    />
  )
}

export default DatePicker

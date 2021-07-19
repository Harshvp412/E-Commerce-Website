import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { DatePicker, Row, Col, Button } from 'antd';
import axios from 'utils/axios';


function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function MyDatePicker({ options, enrollmentID }) {
  const [date, setDate] = useState(null);

  const handleSubmit = useCallback(
    async () => {
      const res = await axios.post('/student-dashboard/update-class-date', { enrollmentID, date })
    },
    [],
  )

  // options = options.map(option => {
  //   return new Date(
  //     option * 1000
  //   )
  //   // .toDateString()
  // })

  var someDate = moment(options[0], "LLLL")
  // .split(
  //   "1970"
  // )[0]

  console.log(someDate)

  function disabledDate(current) {
    // Can not select days before today and today
    return current && new Date(current).getTime() === options[0];
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  return (
    <div>
      <Row>
        <Col>

          <DatePicker
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
            value={date}
            onChange={(date) => {

              console.log(date)
              var newDate = new Date(date)
              console.log(newDate.getTime())
              setDate(newDate.getTime())
            }}
          />
        </Col>
        <Col>
          <Button onClick={handleSubmit} > Select Date</Button>
        </Col>
      </Row>


    </div>
  );
}

export default MyDatePicker;

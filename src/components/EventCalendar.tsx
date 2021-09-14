import { Calendar } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { IEvent } from '../models/IEvent';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  function dateCellRender(value: Moment) {
    const formattedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((event) => event.date === formattedDate);
    return (
      <div>
        {currentDayEvents.map((event, index) => (
          <div key={index}>{event.description}</div>
        ))}
      </div>
    );
  }
  return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;

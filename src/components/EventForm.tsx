import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { Moment } from 'moment';
import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFromProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: React.FC<EventFromProps> = ({ guests, submit }) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: '',
  } as IEvent);
  const { user } = useTypedSelector((state) => state.auth);
  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date?.toDate()) });
    }
  };

  const submitForm = () => {
    submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item label='Event description' name='description' rules={[rules.required()]}>
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label='Event date'
        name='date'
        rules={[rules.required(), rules.isDateAfter('Invalid date')]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label='Select guest' name='guests' rules={[rules.required()]}>
        <Select style={{ width: 120 }} onChange={(guest: string) => setEvent({ ...event, guest })}>
          {guests.map((guest) => (
            <Option key={guest.username} value={guest.username}>
              {guest.username}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify='end'>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;

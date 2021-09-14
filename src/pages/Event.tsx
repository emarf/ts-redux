import React, { useEffect, useState } from 'react';

import { Button, Modal, Row, Layout } from 'antd';

import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

interface EventProps {}

const Event: React.FC<EventProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { user } = useTypedSelector((state) => state.auth);
  const { guests, events } = useTypedSelector((state) => state.event);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const addNewEvent = (event: IEvent) => {
    setIsModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify='center'>
        <Button onClick={showModal}>Add event</Button>
      </Row>
      <Modal title='Add modal' visible={isModalVisible} footer={null} onCancel={closeModal}>
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;

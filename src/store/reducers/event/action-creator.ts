import { UserService } from './../../../api/UserService';
import { AppDispatch } from './../../index';
import { IEvent } from './../../../models/IEvent';
import { IUser } from './../../../models/IUser';
import { SetGuestsAction, SetEventsAction, EventActionEnum } from './types';

export const EventActionCreator = {
  setGuests: (guests: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload: guests,
  }),
  setEvents: (events: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload: events,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreator.setGuests(response.data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreator.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(
        (ev) => ev.author === username || ev.guest === username,
      );
      dispatch(EventActionCreator.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  },
};

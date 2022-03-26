import moment from 'moment';

const initialState = {
  events: [
    {
      title: 'Mi tarea',
      start: moment().toDate(),
      end: moment()
        .add(2, 'hours')
        .toDate(),
      bgcolor: '#fafafa',
      notes: 'Comprar un pastel',
      user: {
        _id: '123',
        name: 'Manuel'
      }
    }
  ],
  activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

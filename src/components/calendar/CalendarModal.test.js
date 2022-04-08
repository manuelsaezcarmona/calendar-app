import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moment from 'moment';

import {
  setActiveEvent,
  eventStartLoading
} from '../../redux/actioncreators/event.actioncreator';

import CalendarModal from './CalendarModal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment()
  .minutes(0)
  .seconds(0)
  .add(1, 'hours');

const later = now.clone().add(1, 'hours');

const initState = {
  ui: {
    modalOpen: true
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Que pacha',
      notes: 'Estamos de testing',
      start: now.toDate(),
      end: later.toDate()
    }
  },
  auth: {
    uid: '78987prueba',
    checking: false,
    username: 'trolo'
  }
};

const store = mockStore(initState);
// En el componente disparo una accion (asincrona) que ya testee en las actions.
// voy a hacer un mock de esa accion.
store.dispatch = jest.fn();

// (A) Mock de la accion startEventDelete

jest.mock('../../redux/actioncreators/event.actioncreator', () => ({
  setActiveEvent: jest.fn(),
  eventStartLoading: jest.fn()
}));

// Mock de localStorage
Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Dado el Calendar Modal', () => {
  test('Debe renderizarse , snapShot', () => {
    // El snapShot me renderiza pero jest se queja porque este
    // modal tiene muchas variables dinamicas que tendria que
    // mockear. Lo hacemos de otra manera
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.modal').exists()).toBe(true);
    // Este expect es demasiado generico y de hecho nos da falsos positivos.
    // Por ejemplo si no revisa que el modal este abiero modalOpen:true.
    // puede estar en falso y la prueba seguira corriendo.
    // mas exacto es comprobar que esa propiedad se encuentra en true
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('los tests', () => {});
});

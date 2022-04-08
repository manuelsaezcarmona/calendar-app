/** El test no es tan complicado como la preparacion del entorno para ejecutar el test */
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import { messages } from '../../helpers/calendar-messages-es';
import { types } from '../../redux/types/action-types';
import {
  setActiveEvent,
  eventStartLoading
} from '../../redux/actioncreators/event.actioncreator';
import { CalendarScreen } from './CalendarScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  ui: {
    modalOpen: false
  },
  calendar: {
    events: [],
    activeEvent: {}
  },
  auth: {
    uid: '78987prueba'
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
    <CalendarScreen />
  </Provider>
);

/** En este componente de terceros lo que tengo que evaluar es que dispare los
 * eventos del calendario
 */
describe('Given the calendar Screen', () => {
  test('Render to componennt', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('Pruebas con las interacciones del calendario', () => {
    /** Para hacer las prubas necesito seleccionar el componente <CalendarScreen>
     * y disparar los eventos que tengo programados en él */
    const calendar = wrapper.find('Calendar');
    // console.log(calendar.exists());
    /** Como puedo verificar los mensajes */
    const calendarMessages = calendar.prop('messages');
    // console.log(calendarMessages);
    // Expero que estos mensajes sea los que configure para poner mi idioma en el programa
    expect(calendarMessages).toEqual(messages);

    /* Quiero el doble click , asi es como lo disparo el evento */

    calendar.prop('onDoubleClickEvent')();
    // ahora puedo hacer el expect qye se dispare la accion. O
    // como tengo mockeado el dispatch de la accion y esta accion es SINCRONA
    // puedo poner que se llame directamente con el contenido del actioncreator uiOpenModal

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: true,
      type: types.uiOpenModal
    });

    // con esto puedo realizar el resto de eventos que he programado
    // Este metodo necesita el evento como parametro, tenemos que definirlo.

    calendar.prop('onSelectEvent')({
      start: 'el evento'
    });
    // podria llamar al dispatch pero me quiero asegurar que se ha llamado
    // a la accion correcta setActiveEvent
    expect(setActiveEvent).toHaveBeenCalledWith({
      start: 'el evento'
    });
    // Asegurarnos que si llamo al on view tambien sea cambiado en el localStorage
    // hacemos como que el usuario ha cambiado la vista
    // Debemos de envolverlo en un act, porque este test supone un cambio en el useState
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastview', 'week');
    });
  });
});

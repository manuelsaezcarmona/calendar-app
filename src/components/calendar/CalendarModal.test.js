import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import { act } from '@testing-library/react';
import {
  eventClearActiveEvent,
  eventStartAddNew,
  startEventUpdate
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
  startEventUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn()
}));

// Mock de Swal
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));
// Mock de localStorage
Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Dado el Calendar Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  /** Cuando hice el anterior test simule un submmit por lo que limpio el
   * formulario, con lo que en esta linea de codigo el titulo esta Vacio
   * si no tendria que setearlo manualmente
   */
  test('Debe de llamar la accion de actualizasar y cerrar el modal', () => {
    // simulemos el comportamiento del submit del form
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    expect(startEventUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });
  test('Si el titulo esta vacio cambiar la clase a error ', () => {
    // simulemos el comportamiento del submit del form
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true
    );
  });
  test('Debe de crear un nuevo evento ', () => {
    const initState2 = {
      ui: {
        modalOpen: true
      },
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        uid: '78987prueba',
        checking: false,
        username: 'trolo'
      }
    };

    const store2 = mockStore(initState2);
    // En el componente disparo una accion (asincrona) que ya testee en las actions.
    // voy a hacer un mock de esa accion.
    store2.dispatch = jest.fn();

    // (A) Mock de la accion startEventDelete

    jest.mock('../../redux/actioncreators/event.actioncreator', () => ({
      startEventUpdate: jest.fn(),
      eventClearActiveEvent: jest.fn()
    }));

    // Mock de localStorage
    Storage.prototype.setItem = jest.fn();

    const wrapper2 = mount(
      <Provider store={store2}>
        <CalendarModal />
      </Provider>
    );
    // Simulacion del input
    wrapper2.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Prueba tocha'
      }
    });
    // simulemos el comportamiento del submit del form
    wrapper2.find('form').simulate('submit', {
      preventDefault() {}
    });
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      notes: expect.any(String),
      start: expect.anything(),
      title: 'Prueba tocha'
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });
  test('Debe validar las fechas', () => {
    // debo de simular la introduccion de datos ya que despues del submit
    // que hizo el test anterior la caja se encuentra limpia.
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Prueba tocha'
      }
    });
    const hoy = new Date();
    // modificamos las fecha en el segundo DateTimePicker. Aqui podemos
    // validar que la fecha de fin no puede ser menor que la de inicio.
    // Como este evento modifica el estado local (useState) debe de envolverse
    // en un act
    act(() => {
      wrapper
        .find('DateTimePicker')
        .at(1)
        .prop('onChange')(hoy);
    });
    // ahora simulamos que damos al submit
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    // Como dispara el swal lo hemos mockeado al principio
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha fin debe ser mayor a la de inicio',
      'error'
    );
  });
});

import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { AppRouter } from './AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Given the appRouter', () => {
  test('When init the APProuter should to show "Espere..." ', () => {
    /** Tengo que definirme el estado que maneja AppRouter */
    const initState = {
      auth: {
        checking: true
      }
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });
  test('If have uid in authState show PublicRoute', () => {
    const initState = {
      auth: {
        checking: false,
        uid: null
      }
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    /** Que hace la ruta publica pues nos lleva a la pagina de LoginScreen
     * podemos hacer el expect de que se renderice esa pagina
     */
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('If have uid in authState show PrivateRoute', () => {
    /** En la ruta privada nos muestra el CalendarScreen y este muestra
     * nuestra informacion de nuestro store: los eventos, evento activo etc...
     * Asi que hay que proveerlo, no importa si esta lleno o no.
     */
    const initState = {
      calendar: {
        events: [],
        activeEvent: {}
      },
      ui: {
        modalOpen: false
      },
      auth: {
        checking: false,
        uid: '12345677434',
        username: 'trolorolo'
      }
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});

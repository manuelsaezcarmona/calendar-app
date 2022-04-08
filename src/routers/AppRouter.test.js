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

/** Tengo que definirme el estado que maneja AppRouter */
const initState = {
  auth: {
    checking: true
  }
};

const store = mockStore(initState);
// En el componente disparo una accion (asincrona) que ya testee en las actions.
// voy a hacer un mock de esa accion.
// store.dispatch = jest.fn();

describe('Given the appRouter', () => {
  test('When init the APProuter should to show "Espere..." ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });
});

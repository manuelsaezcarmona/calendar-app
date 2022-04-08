/** El test no es tan complicado como la preparacion del entorno para ejecutar el test */
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { startEventDelete } from '../../redux/actioncreators/event.actioncreator';
import { DeleteFButton } from './DeleteFButton';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore(initState);
// En el componente disparo una accion (asincrona) que ya testee en las actions.
// voy a hacer un mock de esa accion.
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteFButton />
  </Provider>
);

describe('Given the DeleteFbutton', () => {
  test('Shuuld renderizer correctry', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

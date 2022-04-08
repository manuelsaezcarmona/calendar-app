/* eslint-disable indent */
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from './LoginScreen';
import { StartLogin } from '../../redux/actioncreators/auth.actioncreator';

jest.mock('../../redux/actioncreators/auth.actioncreator', () => ({
  StartLogin: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore(initState);
// En el componente disparo una accion (asincrona) que ya testee en las actions.
// voy a hacer un mock de esa accion.
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Given the LoginScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should renderize & Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should dispatch login action', () => {
    wrapper.find('input[name="logEmail"]').simulate('change', {
      target: {
        name: 'logEmail',
        value: 'trolorolo@email.com'
      }
    });

    wrapper.find('input[name="logPassw"]').simulate('change', {
      target: {
        name: 'logPassw',
        value: '123456'
      }
    });

    wrapper
      .find('form')
      .at(0)
      .prop('onSubmit')({
      preventDefault() {}
    });

    expect(StartLogin).toHaveBeenCalledWith('trolorolo@email.com', '123456');
  });
});

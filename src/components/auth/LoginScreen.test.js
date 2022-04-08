/* eslint-disable indent */
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// esto es para tener la ayuda de los metodos de jest
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Swal from 'sweetalert2';
import { LoginScreen } from './LoginScreen';
import {
  StartLogin,
  startRegister
} from '../../redux/actioncreators/auth.actioncreator';

jest.mock('../../redux/actioncreators/auth.actioncreator', () => ({
  StartLogin: jest.fn(),
  startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
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
  test('If passwords are differents no register', () => {
    wrapper.find('input[name="regPassw1"]').simulate('change', {
      target: {
        name: 'regPassw1',
        value: '123456'
      }
    });

    wrapper.find('input[name="regPassw2"]').simulate('change', {
      target: {
        name: 'regPassw2',
        value: '1234567'
      }
    });
    wrapper
      .find('form')
      .at(1)
      .prop('onSubmit')({
      preventDefault() {}
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'las contraseñas deben ser iguales',
      'error'
    );
  });

  test('Register with same passwords ', () => {
    wrapper.find('input[name="RegName"]').simulate('change', {
      target: {
        name: 'RegName',
        value: 'trolorolo'
      }
    });

    wrapper.find('input[name="regPassw1"]').simulate('change', {
      target: {
        name: 'regPassw1',
        value: '123456'
      }
    });

    wrapper.find('input[name="regPassw2"]').simulate('change', {
      target: {
        name: 'regPassw2',
        value: '123456'
      }
    });

    wrapper
      .find('form')
      .at(1)
      .prop('onSubmit')({
      preventDefault() {}
    });

    expect(Swal.fire).not.toHaveBeenCalledWith(
      'Error',
      'las contraseñas deben ser iguales',
      'error'
    );
    expect(startRegister).toHaveBeenCalledWith('', '123456', 'trolorolo');
  });
});

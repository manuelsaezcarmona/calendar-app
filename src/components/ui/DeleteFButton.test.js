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

// (A) Mock de la accion startEventDelete

jest.mock('../../redux/actioncreators/event.actioncreator', () => ({
  startEventDelete: jest.fn()
}));

const wrapper = mount(
  <Provider store={store}>
    <DeleteFButton />
  </Provider>
);

describe('Given the DeleteFbutton', () => {
  test('Should renderizer correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('When click the button dispatch startEventDelete', () => {
    // Simulo el click.
    wrapper.find('.fab-danger').prop('onClick')();
    /*
    expect(store.dispatch).toHaveBeenCalledWith(startEventDelete());
    Esto no funciona porque?? igual que hemos mockeado el dispatch
    tenemos que mockear la accion startEventDelete, a no ser que hagamos
    la implementacion completa de esa accion pero ya la probamos en su unit test.
    por tanto hagamos un mock completo de esta accion (A)
    */

    expect(startEventDelete).toHaveBeenCalled();
  });
});

/* eslint-disable max-len */
import { types } from './action-types';

/** Esta prueba parece una tonteria pero si alguien se le ocurre cambiar los types la prueba me avisaria con un error */

describe('Given the action types', () => {
  test('should be equal to a object types', () => {
    expect(types).toEqual({
      uiOpenModal: '@ui/Open Modal',
      uiCloseModal: '@ui/Close Modal',

      eventSetActive: '@event Set Active',
      eventCleanLogout: '@event/Logout Clean Active Events',

      eventStartAddNew: '@event/Start add new',
      eventAddnew: '@event/Add new',
      eventCleanActive: '@event/Clean Event Active',
      eventUpdate: '@event/Event update',
      eventDelete: '@event/event Delete',
      eventLoaded: '@event/ Events Loaded',

      authCheckingFinish: '@auth/Finish Cheking login state',
      authStartLogin: '@auth/Start Login',
      authLogin: '@auth/Login',
      authStartRegister: '@auth/Start Register',
      authStartRegisterTokenRenew: '@auth/Start Token Renew',
      authLogout: '@auth/Logout'
    });
  });
});

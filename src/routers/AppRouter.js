/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, BrowserRouter, Switch } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../redux/actioncreators/auth.actioncreator';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export function AppRouter() {
  const dispatch = useDispatch();

  /* En este punto voy a comprobar si el token que hay en localStorage es valido o no
  porque aqui es donde voy a separar mis rutas publicas de mis rutas privadas.
  Al ser el punto de inicio voy disparar el efecto cuando carge el router */

  /** Una de las maneras desde el front es que:
   * 1- tengamos un token validado y
   * 2 - En nuestro redux ya tengamos un uid del back
   * con el token cada vez que el usuario haga algo o naegue entre rutas vamos a estar verificando el token
   * con renew cada vez que vaya expirar el token y siga siendo valido vamos a renovar el token */

  /** Lo primero que desde front y Redux puedo hacer para saber que se ha producido el checking es que este se encuentre
   * en false. El router es sincrono y el valor de checking es asincrono asi que hay que esperarse a que este se encuentre en false
   */

  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  // Mientras que este realizando el cheking de usuario : chekin= true que espere.
  if (checking) {
    return <h5>Espere...</h5>;
  }
  // Para cuando termine la autenticacion si esta ha sido existosa debo de tener un uid
  /** is autenticathed espera un booleano pero uid es un string para convertirlo
   * en booleano podemos usar el operador ! eso retornara un false porque
   * lo contrario a un string !uid=false , si la expresion quiero doblemente negarla
   * entonces me dara un true, funciona mas o menos como que negativo por negativo da positivo
   * !uid=false  si hago !(!uid=false) entonces sera un true
   */
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/"
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

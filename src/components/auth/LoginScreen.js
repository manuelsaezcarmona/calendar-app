/* eslint-disable object-curly-newline */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import './login.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import {
  StartLogin,
  startRegister
} from '../../redux/actioncreators/auth.actioncreator';

export function LoginScreen() {
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    logEmail: '',
    logPassw: ''
  });
  const { logEmail, logPassw } = formLoginValues;

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    RegName: '',
    regEmail: '',
    regPassw1: '',
    regPassw2: ''
  });

  const { RegName, regEmail, regPassw1, regPassw2 } = formRegisterValues;

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(StartLogin(logEmail, logPassw));
  };

  // eslint-disable-next-line consistent-return
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (regPassw1 !== regPassw2) {
      return Swal.fire('Error', 'las contraseñas deben ser iguales', 'error');
    }

    dispatch(startRegister(regEmail, regPassw1, RegName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="logEmail"
                value={logEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="logPassw"
                value={logPassw}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="RegName"
                value={RegName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="RegEmail"
                value={regEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="regPassw1"
                value={regPassw1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="regPassw2"
                value={regPassw2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

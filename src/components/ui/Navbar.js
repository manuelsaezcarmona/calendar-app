/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startlogout } from '../../redux/actioncreators/auth.actioncreator';

export function Navbar() {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startlogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{username}</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" />
        <span> Salir</span>
      </button>
    </div>
  );
}

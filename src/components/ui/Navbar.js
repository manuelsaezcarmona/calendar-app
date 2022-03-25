/* eslint-disable react/button-has-type */
import React from 'react';

export function Navbar() {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Manu</span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt" />
        <span> Salir</span>
      </button>
    </div>
  );
}

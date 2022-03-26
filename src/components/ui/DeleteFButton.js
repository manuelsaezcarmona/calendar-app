/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../redux/actioncreators/event.actioncreator';

export function DeleteFButton() {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventDeleted());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash" />
      <span> Borrar Evento</span>
    </button>
  );
}

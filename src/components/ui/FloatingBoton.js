/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actioncreators/ui.actioncreator';

export function FloatingBoton() {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(uiOpenModal());
  };
  return (
    <div>
      <button className="btn btn-primary fab" onClick={handleButtonClick}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
}

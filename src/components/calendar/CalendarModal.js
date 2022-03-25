/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
/* Segun la documentacion ellos utilizan useState para controlar al modal pero
nosotros vamos a utilizar Redux para que pueda controlar el modal en cualquier
parte de la aplicacion porque desde cualquier parte quiero lanzar este modal */

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const now = moment()
  .minutes(0)
  .seconds(0)
  .add(1, 'hours');

const later = now.clone().add(1, 'hours');

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Aqui es el primer enganche root-element  a nuestra app que es en el index.html o index.js
Modal.setAppElement('#calendar-app');

export default function CalendarModal() {
  /** Para definir la fecha voy a usar un useState porque no lo voy a usar en otra parte */

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(later.toDate());
  const closeModal = () => {
    console.log('closing');
  };

  const handleStartChange = (e) => {
    // Por la libreria este evento me devolvera la fecha.
    console.log(e);
    setDateStart(e);
  };

  const handleEndChange = (e) => {
    // Por la libreria este evento me devolvera la fecha.
    console.log(e);
    setDateEnd(e);
  };

  return (
    <Modal
      isOpen
      /*
      onAfterOpen={afterOpenModal} */
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className="form-control"
            onChange={handleStartChange}
            value={dateStart}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            onChange={handleEndChange}
            value={dateEnd}
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save" />
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
}

/** Extraido de la documentacion de la libreria
 * isOpen es un booleano que va true sera visible y false no aparecerá
 * onAfterOpen,
 * onRequestClose . que hacer cuando se le pida cerrar el modal
 * para aplicar cierto estilo a la hora de cerrar
 * el modal, aplicar un Fade etc...
 * overlayClassName da estilo al fondo cuando el modal esta abierto
 * closeTimeoutMS es un delay en milisegundos para que al cerrar no sea tan abrupto
 */

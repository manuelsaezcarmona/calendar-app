/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../redux/actioncreators/ui.actioncreator';
import {
  addNewEvent,
  eventClearActiveEvent
} from '../../redux/actioncreators/event.actioncreator';
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

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: later.toDate()
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Aqui es el primer enganche root-element  a nuestra app que es en el index.html o index.js
Modal.setAppElement('#calendar-app');

export default function CalendarModal() {
  const { modalOpen } = useSelector((store) => store.ui);
  const { activeEvent } = useSelector((store) => store.calendar);
  const dispatch = useDispatch();

  /** Para definir la fecha voy a usar un useState porque no lo voy a usar en otra parte */
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(later.toDate());
  const [titleValid, settitleValid] = useState(true);

  const [formValues, setformValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  /** Necesito un efecto que este pendiente de los cambios del evento activo para que
   * cuando este cambie se actulice con los nuevos cambios en el store, tambien me va a
   * servir para cuando haga doble click en el evento el modal recupere los datos y se
   * los muestre al usuario
   */

  useEffect(() => {
    /* Al cargar el calendario el activeEvent es null asi que lo controlamos
    TIP lo que usemos dentro del useEffect hay que ponerlo como dependencia para que useEffect se dispare
    cuando uno de los dos cambie */
    if (activeEvent) {
      setformValues(activeEvent);
    }
  }, [activeEvent, setformValues]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    // Vaciamos el efecto activo
    dispatch(eventClearActiveEvent());
    // Vaciamos el formulario
    setformValues(initEvent);
  };

  const handleStartChange = (e) => {
    // Por la libreria este evento me devolvera la fecha.
    console.log(e);
    setDateStart(e);
    setformValues({
      ...formValues,
      start: e
    });
  };

  const handleEndChange = (e) => {
    // Por la libreria este evento me devolvera la fecha.
    console.log(e);
    setDateEnd(e);
    setformValues({
      ...formValues,
      end: e
    });
  };

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault(e);
    // Validacion de formulario
    // Primero las fechas los datos son guardados como fechas JS nativa, tenemos que
    // convertirlas para que sea facil trabajar con ellas
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('Error', 'La fecha fin debe ser mayor a la de inicio', 'error');
      return;
    }
    // Vamos a hacer la validacion sin libreria sino con otro estado que lo controle.
    // Y cuando no sea valido cambiare la clase del input a otra no valida que me proporciona bootstrap
    if (title.trim().length < 2) {
      settitleValid(false);
      return;
    }

    // Al finalizar debe de ir a la base de datos etc. por ahora cerramos el modal
    // En los campos del formularios tenemos todos los datos para generar un nuevo evento.
    // Podemos disparar la accion de añadir una nueva nota
    console.log(formValues);
    dispatch(
      addNewEvent({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '123',
          name: 'Manuel Saez'
        }
      })
    );

    settitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
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
      <form className="container" onSubmit={handleSubmitForm}>
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
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
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
            value={notes}
            onChange={handleInputChange}
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

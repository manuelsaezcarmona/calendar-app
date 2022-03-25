import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';

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
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Aqui es el primer enganche root-element  a nuestra app que es en el index.html o index.js
Modal.setAppElement('#calendar-app');

export default function CalendarModal() {
  // Temporalmente voy a usar el useState para controlar el Modal.
  const [isOpen, setisOpen] = useState(true);

  const closeModal = () => {
    console.log('closing');
    setisOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      /*
      onAfterOpen={afterOpenModal} */
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Soy un modal</h1>
      <hr />
      <span>Aqui estamos...</span>
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

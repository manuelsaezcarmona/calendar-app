/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import moment from 'moment';

/** Para transformar el array de eventos que me viene del back uso la funcion map y le paso el
 * mismo objeto y le sobreescribo las propiedades que me interesan en este caso transformar
 * las fechas en objetos Date para ello me ayudo de la libreria moment.
 */

export const prepareEvents = (events = []) => {
  return events.map((event) => ({
    ...event,
    end: moment(event.end).toDate(),
    start: moment(event.start).toDate()
  }));
};

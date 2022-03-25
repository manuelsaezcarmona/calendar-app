/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';

export function CalendarEvent({ event }) {
  const { title, user } = event;

  return (
    <div>
      <span>{title} - </span>
      <strong>{user.name}</strong>
    </div>
  );
}

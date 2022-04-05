/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

export function PublicRoute({
  isAuthenticated,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

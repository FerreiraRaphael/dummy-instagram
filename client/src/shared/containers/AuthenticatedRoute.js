import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUser } from '../../features/auth/graphql/currentUser';

export const AuthenticatedRoute = ({ component, redirectTo, ...rest }) => (
  <CurrentUser>
    {({ currentUser, loading }) => (
      <Route
        {...rest}
        render={(props) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (!currentUser && !loading) {
            return <Redirect to={redirectTo} />;
          }
          return React.createElement(component, props);
        }}
      />
    )}
  </CurrentUser>
);

AuthenticatedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

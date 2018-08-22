import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Logout } from '../graphql/logout';
import { UserContext } from '../../../core/UserContext';

const LogoutLink = ({ history }) => (
  <UserContext.Consumer>
    {({ clearContext }) => (
      <Logout
        onCompleted={() => {
          clearContext();
          history.push('/');
        }}
        onError={() => {
          clearContext();
          history.push('/');
        }}
      >
        {(logoutMutation) => (
          <button onClick={() => logoutMutation()}>Logout</button>
        )}
      </Logout>
    )}
  </UserContext.Consumer>
);

LogoutLink.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LogoutLink);

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { Register } from '../graphql/register';
import { UserContext } from '../../../core/UserContext';

const RegisterForm = ({ history }) => (
  <UserContext.Consumer>
    {({ setToken }) => (
      <Register
        onCompleted={({ register }) => {
          setToken(register);
          history.push('/');
          window.location.reload();
        }}
      >
        {(registerMutation, { loading, error }) => (
          <UserForm
            id="RegisterForm"
            submitButtonText="Register"
            loading={loading}
            error={error ? 'Username already in use' : ''}
            handleSubmit={({ username, password }) =>
              registerMutation({
                variables: { username, password },
              })
            }
          />
        )}
      </Register>
    )}
  </UserContext.Consumer>
);

RegisterForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(RegisterForm);

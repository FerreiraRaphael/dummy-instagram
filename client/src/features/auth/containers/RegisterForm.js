import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { Register } from '../graphql/register';
import { UserContext } from '../../../core/UserContext';

const RegisterForm = ({ history }) => (
  <UserContext.Consumer>
    {({ setToken }) => (
      <Register>
        {(registerMutation, { loading, error }) => (
          <UserForm
            id="RegisterForm"
            submitButtonText="Login"
            loading={loading}
            error={error}
            handleSubmit={({ username, password }) =>
              registerMutation({
                variables: { username, password },
                update(
                  proxy,
                  {
                    data: { register },
                  },
                ) {
                  setToken(register);
                  history.push('/');
                  window.location.reload();
                },
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

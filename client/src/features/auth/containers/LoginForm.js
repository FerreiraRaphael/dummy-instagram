import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { Login } from '../graphql/login';
import { UserContext } from '../../../core/UserContext';

const LoginForm = ({ history }) => (
  <UserContext.Consumer>
    {({ setToken }) => (
      <Login>
        {(loginMutation, { loading, error }) => (
          <UserForm
            id="LoginForm"
            submitButtonText="Login"
            loading={loading}
            error={error}
            handleSubmit={({ username, password }) =>
              loginMutation({
                variables: { username, password },
                update(
                  proxy,
                  {
                    data: { login },
                  },
                ) {
                  setToken(login);
                  history.push('/');
                  window.location.reload();
                },
              })
            }
          />
        )}
      </Login>
    )}
  </UserContext.Consumer>
);

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginForm);

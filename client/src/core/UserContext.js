import React from 'react';
import PropTypes from 'prop-types';
import { PersistContext } from './PersistContext';

export const UserContext = React.createContext({
  user: null,
  token: null,
  setCurrentUser: () => {},
  setToken: () => {},
  clearContext: () => {},
});

const initialState = {
  user: null,
  token: null,
};

export class UserProvider extends React.Component {
  constructor() {
    super();
    this.persistContext = new PersistContext('UserContext', initialState);
    this.state = this.persistContext.getState();
  }

  componentDidUpdate(prevProps, prevState) {
    this.persistContext.persistState(prevState);
  }

  handleUserChange({ id, name }) {
    this.setState({
      user: {
        id,
        name,
      },
    });
  }

  handleTokenChange(token) {
    this.setState({ token });
  }

  clearContext() {
    this.setState(initialState);
  }

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          token: this.state.token,
          setCurrentUser: (user) => this.handleUserChange(user),
          setToken: (token) => this.handleTokenChange(token),
          clearContext: () => this.clearContext(),
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

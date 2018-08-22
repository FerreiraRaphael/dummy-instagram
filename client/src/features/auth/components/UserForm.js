import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../../shared/components/TextInput';

export class UserForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  handleChange(value, field) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    const { username, password, error } = this.state;
    const { submitButtonText, id, handleSubmit } = this.props;
    const outSideError = this.props.error;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!this.state.username || !this.state.password) {
            this.setState({ error: 'Fill all required fields !' });
            return;
          }
          handleSubmit({ username, password });
        }}
      >
        {(error || outSideError) && (
          <p style={{ color: '#f44336' }}>{error || outSideError}</p>
        )}
        <TextInput
          id={`UserForm-username-${id}`}
          label="Username"
          value={username}
          onChange={(e) => this.handleChange(e.target.value, 'username')}
        />
        <TextInput
          id={`UserForm-password-${id}`}
          type="password"
          label="Password"
          value={password}
          onChange={(e) => this.handleChange(e.target.value, 'password')}
        />
        <div>
          <button type="submit">{submitButtonText}</button>
        </div>
      </form>
    );
  }
}

UserForm.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  error: '',
  submitButtonText: 'Submit form',
};

import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../../shared/components/TextInput';

export class UserForm extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange(value, field) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    const { username, password } = this.state;
    const { submitButtonText, id, handleSubmit } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ username, password });
        }}
      >
        <TextInput
          id={`UserForm-username-${id}`}
          label="Username"
          value={username}
          onChange={(e) => this.handleChange(e.target.value, 'username')}
        />
        <TextInput
          id={`UserForm-password-${id}`}
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
  id: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  submitButtonText: 'Submit form',
};

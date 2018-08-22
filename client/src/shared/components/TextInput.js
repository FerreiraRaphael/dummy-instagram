import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.css';

export const TextInput = ({ id, type, value, onChange, label }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      className="form-control"
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
    />
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text',
  label: '',
};

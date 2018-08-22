import React from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

export const Switch = ({ id, value, onChange, label }) => (
  <div className="Switch">
    <label htmlFor={`Switch-${id}`}>{label}</label>
    <input
      id={`Switch-${id}`}
      onChange={(e) => onChange(e.nativeEvent.target.checked)}
      value={value}
      className="Switch"
      type="checkbox"
      checked={value}
    />
  </div>
);

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  value: false,
  label: '',
  onChange: () => {},
};

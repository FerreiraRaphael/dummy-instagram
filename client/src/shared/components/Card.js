import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export const Card = ({ children }) => <div className="Card">{children}</div>;

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

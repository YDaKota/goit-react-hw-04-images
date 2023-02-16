import React from 'react';
import style from './Button.module.css';
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button type="button" className={style.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


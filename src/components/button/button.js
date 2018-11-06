import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./button.css";

const Button = ({ children, inverted, ...rest }) => {
  const classNames = cn(styles.Button, {
    [styles.Button___inverted]: inverted
  });

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Sets the button as inverted
   */
  inverted: PropTypes.bool
};

Button.defaultProps = {
  inverted: false
};

export default Button;

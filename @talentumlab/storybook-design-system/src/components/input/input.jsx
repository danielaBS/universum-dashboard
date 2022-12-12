import React from "react";
import PropTypes from "prop-types";
import "./input.module.css";

const Input = (props) => {
  const [showPass, setShowPass] = React.useState(false);

  const {
    inputLabel,
    isLabel,
    labelColor,
    inputWidth,
    inputHeight,
    inputColor,
    inputBorderRadius,
    inputFontSize,
    type,
    id,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    register,
    valueRequired,
  } = props;

  const styles = {
    width: inputWidth,
    height: inputHeight,
    color: inputColor,
    borderRadius: inputBorderRadius,
    fontSize: inputFontSize,
    border: "1px solid " + inputColor,
  };

  return (
    <>
      {isLabel && (
        <label
          className="input__label"
          htmlFor={id}
          style={{ color: labelColor }}
        >
          {inputLabel}
        </label>
      )}
      <div className="input">
        <input
          type={showPass ? "text" : type}
          name={id}
          className="input__login"
          style={styles}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus()}
          onBlur={() => {
            setTimeout(() => {
              onBlur();
            }, 160);
          }}
          {...register(id, {
            required: valueRequired,
          })}
        />
        {type === "password" && (
          <span
            className={showPass ? "input__show-pass" : "input__hidden-pass"}
            onClick={() => setShowPass(!showPass)}
          ></span>
        )}
      </div>
    </>
  );
};

export default Input;

Input.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  isLabel: PropTypes.bool.isRequired,
  labelColor: PropTypes.string.isRequired,
  inputWidth: PropTypes.string.isRequired,
  inputHeight: PropTypes.string.isRequired,
  inputColor: PropTypes.string.isRequired,
  inputBorderRadius: PropTypes.string.isRequired,
  inputFontSize: PropTypes.string.isRequired,
  valueRequired: PropTypes.any,
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "file",
    "hidden",
    "image",
    "number",
    "range",
    "reset",
    "search",
    "submit",
    "datetime-local",
    "date",
    "color",
    "checkbox",
  ]),
  id: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
  onFocus: PropTypes.any.isRequired,
  onBlur: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func,
};

Input.defaultProps = {
  inputLabel: "Iniciar sesión, usuario",
  onChange: (value) => {},
  onFocus: () => {},
  onBlur: () => {},
  isLabel: true,
  labelColor: "#E1E1E1",
  inputWidth: "100%",
  inputHeight: "2.5rem",
  inputColor: "#4B4B4B",
  inputBorderRadius: "5px",
  inputFontSize: "15px",
  type: "text",
  id: "usuario",
  placeholder: "Usuario",
  valueRequired: "Este campo es requerido",
  register: () => {},
};

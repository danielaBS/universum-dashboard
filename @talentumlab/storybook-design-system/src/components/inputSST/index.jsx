import React from "react";
import PropTypes from "prop-types";
/* ------------------------------------ / ----------------------------------- */
import "./input_sst.module.css";
import { HidePass, ShowPass } from "../icons";

const Input = ({label, variant, error, show_label, show_error, ...props}) => {

  const [showPass, setShowPass] = React.useState(false);

  const changeShowPass = () => {
    setShowPass(!showPass);
  };

  const style = {
    borderColor: show_error ? "red" : "",
  };

  const changeType = () => {
    switch (variant) {
      case "password":
        return (
          <>
            {!showPass ? (
              <ShowPass onClick={changeShowPass} />
            ) : (
              <HidePass onClick={changeShowPass} />
            )}
            <input
              style={style}
              type={!showPass ? variant : "text"}
              {...props}
            />
          </>
        );

      case "text":
        return <input style={style} type={variant} {...props} />;

      default:
        break;
    }
  };

  return (
    <div className="container_sst">
      <label>
        {show_label ? label : null}
        <div className="form_input">
          {changeType()}
          <p>{show_error ? error : null}</p>
        </div>
      </label>
    </div>
  );
};
export default Input;

Input.defaultProps = {
  variant: "text",
};

Input.protoTypes = {
  variant: PropTypes.oneOf(["text", "password"]),
  label: PropTypes.string,
  show_error: PropTypes.bool,
  show_label: PropTypes.bool,
  error: PropTypes.string,
};

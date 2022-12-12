import React from "react";
import "./toggleSwitch.module.css";

const ToggleSwitch = (props) => {
  const checked = props.checked;
  const value = props.value;
  const propsFunction = props.onChange;
  const id = props.id;
  return (
    <div>
      <label className="toggle_switch">
        <input          
          id={id}
          defaultChecked={checked}
          onChange={propsFunction}
          type="checkbox"
          value={value}
        />
        <span className="toggle_switch__slider" />
        
      </label>
    </div>
  );
};

export default ToggleSwitch;
ToggleSwitch.propTypes = {
  
};

ToggleSwitch.defaultProps = {
  
};

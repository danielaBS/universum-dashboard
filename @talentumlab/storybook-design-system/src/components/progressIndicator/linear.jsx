import React from "react";
import PropTypes from "prop-types";
import "./linear.module.css";
/**
 *
 * @param {style} props
 * style.width
 * style.colorPrimary
 * style.colorSecondary
 * dentro de la variable entra un color para el fondo en myProgress y otro para myBar.
 * @returns
 * retorna un componente que carga una barra sobre otra, myBar sobre myProgress,
 * el width traido de style.width varia según la lógica detrás de style, depende
 * de donde se comparen los datos para sacar un porcentaje que sea igual al porcentaje de
 * width en myBar
 */
const Linear = (props) => {
  var colorPrimary;
  var colorSecondary;
  if (props.colorType === "primary") {
    colorPrimary = "#13007C";
    colorSecondary = "#9EBAC6";
  } else {
    colorPrimary = "#32779D";
    colorSecondary = "#BAD7E2";
  }
  
  return (
    <div>
      <div className="linear-progress" style={{ backgroundColor: colorSecondary }}>
        <div
          className="linear-progress__inner-line"
          style={{ backgroundColor: colorPrimary, width: props.width, height: props.height + "rem "}}
        ></div>
        {/**Actualmente están quemados los valores, esta sería la
         * sentencia para pasar el objeto <div className="myBar"
         *  style={{ width: width, backgroundColor: colorPrimary }}></div>
         * Y para myProgress <div className="myProgress"
         *  style={{ width: width, backgroundColor: colorSecondary }}></div>*/}
      </div>
    </div>
  );
}
export default Linear;

Linear.propTypes = {
  width: PropTypes.string.isRequired,
  colorType: PropTypes.oneOf(["primary", "secondary"]),
  height: PropTypes.number.isRequired,
};

Linear.defaultProps = {
  width: "40%",
  colorType: "primary",
  height: 0.2,
};

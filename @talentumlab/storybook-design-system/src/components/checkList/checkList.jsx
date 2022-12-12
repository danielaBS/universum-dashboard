import React from "react";
import PropTypes from "prop-types";
import "./checkList.module.css";

const CheckList = (props) => {

  const { defItems,  checkColor} = props;
  
  const optionSelected = (index, id) => {
    props.setSelected(index)
    props.setIdVariable(id)
  }


  let divLists = defItems.map((item, i) => (
    <div
      key={i}
      className="container"
      onClick={() => optionSelected(i, item.id)}
      style={{ fontSize: props.fontSize }}
    >
      {item.name}
      <input
        type="radio"
        checked={props.selected === i}
        name="radio"
        onChange={() => {}}
      ></input>
      <span
        className="checkmark"
        style={{ backgroundColor: props.selected === i ? checkColor : "#eee" }}
      ></span>
    </div>
  ));
  return <div className="toggle_list_tittle">{divLists}</div>;
};

export default CheckList;

CheckList.propTypes = {
  defItems: PropTypes.array,
  checkColor: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  fontSize: PropTypes.string.isRequired,
  dataCurrentOption: PropTypes.object.isRequired,
};

CheckList.defaultProps = {
  defItems: [
    { id: 1, name: "this is first line" },
    { id: 2, name: "this is second line" },
    { id: 3, name: "this is third line" },
  ],
  checkColor: "#32779D",
  dataCurrentOption: {},
  selected: 0,
  setSelected: () => {},
  setIdVariable: () => {},
  fontSize: "23px",
};

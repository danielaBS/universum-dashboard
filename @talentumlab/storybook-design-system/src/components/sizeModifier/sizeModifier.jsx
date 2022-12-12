import React from "react";
import ButtonComponent from "../buttonComponent/buttonComponent";
// import ErrorMessage from './Error';
import PropTypes from "prop-types";
import "./sizeModifier.module.css";

const SizeModifier = (props) => {
  const { width, fontSize, title, textCard } = props;

  const [showMore, setShowMore] = React.useState(false);

  const showMoreInfo = () => setShowMore(!showMore);

  let show = showMore ? "inline" : "none";
  let text = showMore ? "LESS" : "MORE";
  let type = showMore ? "outlined" : "contained";
  let color = showMore ? "#0E3192" : "#ffffff";

  return (
    <div className="size-modifier" style={{ width: width, fontSize: fontSize }}>
      <div className="size-modifier__text-modifier">
        <h3>{title}</h3>
        <p>{textCard}</p>
        <p style={{ display: show }}>{props.moreText}</p>
      </div>
      <div className="size-modifier__button">
        <ButtonComponent
          text={text}
          type={type}
          passedFunction={showMoreInfo}
          color={color}
        />
      </div>
    </div>
  );
};

export default SizeModifier; // Don’t forget to use export default!

SizeModifier.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
  title: PropTypes.string,
  textCard: PropTypes.string.isRequired,
  moreText: PropTypes.string.isRequired,
};

SizeModifier.defaultProps = {
  width: "100%",
  fontSize: "1rem",
  title: "Headline",
  textCard:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta est tempora eveniet! Qui repellat, autem laborum voluptas hic necessitatibus omnis?",
  moreText:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, voluptate",
};

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./modal.module.css";
import Image from "../imageComponent/imageComponent";

const Modal = (props) => {
  const { children, width, height, backdrop, isOpen, isClose, iconClose } =
    props;

  const styles = {
    width: width,
    height: height,
  };

  const [stateModal, setStateModal] = useState(isOpen);

  useEffect(() => {
    setStateModal(isOpen);
  }, [isOpen]);

  return (
    stateModal && (
      <>
        {backdrop ? <div className="backdrop" /> : null}
        <div
          className="modal fade"
          onClick={() => (backdrop === "static" ? null : isClose())}
        >
          <div className="modal_dialog" style={styles}>
            <div className="modal_close" onClick={() => isClose()}>
              <Image width="100%" src={iconClose} />
            </div>
            <div className="modal_content">{children}</div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;

Modal.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  backdrop: PropTypes.oneOf([true, false, "static"]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  iconClose: PropTypes.string,
};

Modal.defaultProps = {
  width: "20%",
  height: "auto",
  isOpen: false,
  backdrop: true,
  iconClose: "./images/navigation/close_2.svg",
};

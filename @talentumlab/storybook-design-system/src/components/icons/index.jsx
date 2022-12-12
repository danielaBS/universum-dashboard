import React from "react";
import {
  AiOutlineLoading3Quarters,
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BiError, BiErrorCircle } from "react-icons/bi";
import { VscPass } from "react-icons/vsc";

import "./icons.module.css";

export const Spinner = () => {
  return <AiOutlineLoading3Quarters className="spinner_sst" />;
};

export const ShowPass = (props) => {
  return <AiFillEyeInvisible {...props} />;
};

export const HidePass = (props) => {
  return <AiFillEye {...props} />;
};

export const Error = (props) => {
  return <BiErrorCircle className="alert_icons error_sst" />;
};

export const Success = (props) => {
  return <VscPass className="alert_icons success_sst" />;
};

export const Warning = (props) => {
  return <BiError className="alert_icons warning_sst" />;
};

export const Info = (props) => {
  return <AiOutlineInfoCircle className="alert_icons info_sst" />;
};

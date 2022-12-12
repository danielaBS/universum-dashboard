import React from "react";

import Input from "../components/input/input";

export default {
  title: "Diseño/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const With_Label = Template.bind({});
With_Label.args = {
  inputLabel: "Iniciar sesión, usuario",
  isLabel: true,
};

export const No_Label = Template.bind({});
No_Label.args = {
  isLabel: false,
  type: "text",
};

export const Password = Template.bind({});
Password.args = {
  isLabel: false,
  placeholder: "Contraseña",
  type: "password",
  id: "password",
};

export const Email = Template.bind({});
Email.args = {
  isLabel: false,
  type: "email",
  placeholder: "Email",
  id: "email",
};

export const Date = Template.bind({});
Date.args = {
  isLabel: false,
  type: "date",
  id: "date",
};

export const Check = Template.bind({});
Check.args = {
  isLabel: false,
  type: "checkbox",
  id: "checkbox",
};

"use strict";
import "./css/index.css";

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(
  require("./service/PasswordsService")
);
const FormManagerExtended_1 = __importDefault(
  require("./dom/FormManagerExtended")
);
const FormFields_1 = require("./service/FormFields");
const types_1 = require("./model/types");
const FormManager_1 = __importDefault(require("./dom/FormManager"));
const passwordGeneratorElement = document.querySelector(".passwordGenerator");
const ps = new PasswordsService_1.default();
const submit = (_a) => {
  var { length } = _a,
    prop = __rest(_a, ["length"]);
  if (Object.values(prop).some((el) => el === true)) {
    const newPassword = ps.passwordGenerator({
      length: Number(length),
      properties: prop,
    });
    FormManagerExtended_1.default.showPassword(
      newPassword.stringPass,
      "show-password"
    );
    reloadPassStrength(newPassword.passStrength);
  }
};
const copyPassToClipBoard = () => {
  const textarea = document.createElement("textarea");
  const input = document.getElementById("show-password");
  const password = input.value;
  if (!password) {
    alert("please generate a password");
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("copy password to a clipboard!");
};
const reloadPassStrength = (strength) => {
  const oldPassStr = document.querySelector("#pass-strength");
  const passStr = FormManagerExtended_1.default.createPassStrength(strength);
  oldPassStr && oldPassStr.replaceWith(passStr);
};
const formProperties = {
  id: "",
  DOMElement: passwordGeneratorElement,
  className: "passwordGenerator__box passwordGenerator__box--content",
  submitButtonMessage: "Generate",
  submitButton: {
    className: "btn btn--generate",
    submitCallback: submit,
  },
  formHeaderText: "",
  initialState: {
    length: "5",
    [types_1.Properties.UPPERCASE]: true,
    [types_1.Properties.LOWERCASE]: true,
    [types_1.Properties.NUMBER]: true,
  },
  formFields: FormFields_1.formFieldsGenerator,
};
const headerProperties = {
  DOMElement: passwordGeneratorElement,
  id: "",
  className: "passwordGenerator__box passwordGenerator__box--header",
  submitButtonMessage: "",
  submitButton: {
    className: "btn btn--copy",
    submitCallback: copyPassToClipBoard,
  },
  formHeaderText: "password generator",
  formFields: FormFields_1.formFieldsHeader,
};
const fm2 = new FormManager_1.default(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);
const fm = new FormManagerExtended_1.default(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);

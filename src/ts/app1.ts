import PasswordsService from "./service/PasswordsService";
import FormHeader from "./dom/FormHeader";
import { Properties, FormProperties, State, PassStrength } from "./model/types";
import FormManager from "./dom/FormManager";

const passwordGeneratorElement = document.querySelector(
  ".passwordGenerator"
) as HTMLElement;

const ps = new PasswordsService();

const submit = ({ length, ...prop }: State) => {
  const lengthInput = document.querySelector("#length") as HTMLElement;
  const newPassword = ps.passwordGenerator({
    length: Number(length),
    properties: prop,
  });
  FormHeader.showPassword(newPassword.stringPass, "show-password");
  reloadPassStrength(newPassword.passStrength);
};
const copyPassToClipBoard = () => {
  const textarea = document.createElement("textarea");
  const input = document.getElementById("show-password") as HTMLInputElement;
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

const reloadPassStrength = (strength: PassStrength) => {
  console.log(strength);
  const oldPassStr = document.querySelector("#pass-strength");
  const passStr = FormHeader.createPassStrength(strength);
  oldPassStr && oldPassStr.replaceWith(passStr);
};

const formProperties: FormProperties = {
  id: "pass-form",
  DOMElement: passwordGeneratorElement,
  className: "passwordGenerator__box passwordGenerator__box--content",
  submitButtonMessage: "generate",
  submitCallback: submit,
  formHeaderText: "",
  initialState: { length: "5" },

  formFields: [
    {
      type: "range",
      labels: ["length"],
      id: ["pass-length"],
      attributes: [
        ["min", "5"],
        ["max", "20"],
      ],
      initialValue: "5",
    },
    {
      type: "checkbox",
      labels: [
        Properties.SYMBOL,
        Properties.NUMBER,
        Properties.LOWERCASE,
        Properties.UPPERCASE,
      ],
    },
  ],
};
const headerProperties: FormProperties = {
  DOMElement: passwordGeneratorElement,
  id: "",
  className: "passwordGenerator__box passwordGenerator__box--header",
  submitButtonMessage: "co",
  submitCallback: copyPassToClipBoard,
  formHeaderText: "password generator",
  initialState: {},
  formFields: [
    {
      id: ["show-password"],
      type: "string",
      labels: [""],
      className: ["show-password"],
    },
  ],
};

const fm2 = new FormHeader(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);

const fm = new FormManager(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);

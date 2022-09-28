"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormManager {
    constructor({ className, submitCallback, submitButtonMessage, formHeaderText, formFields, }) {
        this.formElement = this.createFormElement();
        this.state = {};
        this.className = className;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
    }
    createForm() {
        this.formElement.className = this.className;
        this.formFields.forEach((el) => this.createInput(el));
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log(this.state);
            this.submitCallback(this.state);
        });
        return this.formElement;
    }
    createFormElement() {
        const formElement = document.createElement("form");
        return formElement;
    }
    createInput({ type, labels, attributes }) {
        return labels.forEach((label) => {
            const id = label;
            const formGroupElement = FormManager.createFormGroupElement(type);
            const inputElement = document.createElement("input");
            inputElement.id = id;
            inputElement.type = type;
            inputElement.name = type;
            inputElement.className = "form-control";
            formGroupElement.appendChild(inputElement);
            if (attributes) {
                attributes.forEach(([name, value]) => {
                    inputElement.setAttribute(name, value);
                });
            }
            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", id);
            labelElement.textContent = id;
            formGroupElement.appendChild(labelElement);
            inputElement.addEventListener("input", (e) => {
                switch (type) {
                    case "range":
                        // @ts-ignore
                        this.showLengthValue(labelElement, e.target.value);
                        // @ts-ignore
                        return this.setState(label, e.target.value);
                    case "checkbox":
                        // @ts-ignore
                        return this.setState(label, e.target.checked);
                }
            });
            this.formElement.appendChild(formGroupElement);
        });
    }
    showLengthValue(labelElement, value) {
        labelElement.textContent = value;
    }
    static createFormGroupElement(type) {
        const formGroupElement = document.createElement("div");
        formGroupElement.className = `form-group form-group--${type}`;
        return formGroupElement;
    }
    static createSubmitButton(message) {
        const formattedMessage = message.toUpperCase();
        const buttonElement = document.createElement("button");
        buttonElement.className = "btn ";
        buttonElement.setAttribute("type", "submit");
        buttonElement.textContent = formattedMessage;
        return buttonElement;
    }
    setState(name, value) {
        console.log(this.state);
        const state = {};
        state[name] = value;
        this.state = Object.assign(Object.assign({}, this.state), state);
    }
    static showPassword(password, inputId) {
        const input = document.querySelector(`#${inputId}`);
        input.value = password;
    }
}
exports.default = FormManager;

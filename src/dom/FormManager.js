"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormManager {
    constructor({ className, submitCallback, submitButtonMessage, formHeaderText, formFields, }) {
        this.formElement = this.createFormElement();
        this.formHeaderText = "";
        this.state = {};
        this.className = className;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
    }
    createFormElement() {
        const formElement = document.createElement("form");
        return formElement;
    }
    createForm() {
        // const formHeader: HTMLElement = document.createElement("h1");
        // formHeader.textContent = this.formHeaderText;
        //this.formElement.appendChild(formHeader);
        this.formElement.className = this.className;
        this.formFields.forEach((el) => this.createInput(el));
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback();
        });
        return this.formElement;
    }
    createInput({ type, labels }) {
        return labels.forEach((label) => {
            const id = label;
            const formGroupElement = FormManager.createFormGroupElement(type);
            const inputElement = document.createElement("input");
            inputElement.id = id;
            inputElement.type = type;
            inputElement.name = type;
            inputElement.className = "form-control";
            formGroupElement.appendChild(inputElement);
            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", id);
            labelElement.textContent = id;
            formGroupElement.appendChild(labelElement);
            this.formElement.appendChild(formGroupElement);
        });
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
}
exports.default = FormManager;

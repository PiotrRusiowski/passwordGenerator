"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passwordGeneratorElement = document.querySelector(".passwordGenerator");
class FormManager {
    constructor({ className, submitCallback, submitButtonMessage, formHeaderText, formFields, }) {
        this.formElement = this.createFormElement();
        this.state = { length: "5" };
        this.className = className;
        this.submitCallback = submitCallback;
        this.submitButtonMessage = submitButtonMessage;
        this.formHeaderText = formHeaderText;
        this.formFields = formFields;
    }
    createForm() {
        this.formElement.className = this.className;
        this.formFields.forEach((el) => this.createInput(el));
        this.formElement.appendChild(FormManager.createPassStrength(this.state.length));
        this.formElement.appendChild(FormManager.createSubmitButton(this.submitButtonMessage));
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitCallback(this.state);
        });
        return this.formElement;
    }
    createFormElement() {
        const formElement = document.createElement("form");
        return formElement;
    }
    createInput({ type, labels, attributes, initialValue }) {
        return labels.forEach((label) => {
            const id = label;
            const formGroupElement = FormManager.createDivElement(`form-group-element form-group-element--${type}`);
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
            if (initialValue) {
                labelElement.textContent = initialValue;
                inputElement.value = initialValue;
            }
            inputElement.addEventListener("input", (event) => {
                const target = event.target;
                ///////if(target)????
                switch (type) {
                    case "range":
                        inputElement.value = target.value;
                        labelElement.textContent = target.value;
                        return this.setState(label, target.value);
                    case "checkbox":
                        return this.setState(label, target.checked);
                }
            });
            this.formElement.appendChild(formGroupElement);
        });
    }
    static createDivElement(className = "", id = "") {
        const divElement = document.createElement("div");
        if (id.length)
            divElement.id = id;
        if (className.length)
            divElement.className = className;
        return divElement;
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
        const state = {};
        state[name] = value;
        this.state = Object.assign(Object.assign({}, this.state), state);
    }
    reloadForm() {
        const formElement = this.createForm();
        const oldForm = document.querySelector(".passwordGenerator__box--content");
        // @ts-ignore
        passwordGeneratorElement.removeChild(oldForm);
        console.log(oldForm);
        // FormManager.removeElement("class", "passwordGenerator__box--content");
        passwordGeneratorElement.appendChild(formElement);
    }
    static showPassword(password, inputId) {
        const input = document.querySelector(`#${inputId}`);
        input.value = password;
    }
    static removeElement(selector, selectorValue) {
        let elementToRemove;
        console.log(elementToRemove);
        selector === "id"
            ? (elementToRemove = document.getElementById(selectorValue))
            : document.getElementsByClassName(selectorValue);
        elementToRemove && elementToRemove.remove();
    }
    static createPassStrength(strength = "weak") {
        const domElement = FormManager.createDivElement(strength, "passStrength");
        domElement.textContent = strength;
        for (let i = 1; i < 4; i++)
            domElement.appendChild(FormManager.createDivElement("dupa"));
        return domElement;
    }
}
exports.default = FormManager;

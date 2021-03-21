class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector,
    this._submitButtonSelector = settings.submitButtonSelector,
    this._inactiveButtonClass = settings.inactiveButtonClass,
    this._inputErrorClass = settings.inputErrorClass,
    this._errorClass = settings.errorClass,
    this._formElement = formElement
  }

  enableValidation() {
    this._setEventListeners();
  }

  _showInputError(inputElement, errorElement, validationMessage) {
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    const isAtLeastOneInvalid = inputList.some((input) => !input.validity.valid);
    if (isAtLeastOneInvalid) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }
}

export {FormValidator};

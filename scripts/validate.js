const showInputError = (inputElement, errorElement, inputErrorClass, errorClass, validationMessage) => {
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
}

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass, inputElement.validationMessage)
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
}

const toggleButtonState = (formElement, inputList, inactiveButtonClass, submitButtonSelector) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const isAtLeastOneInvalid = inputList.some((input) => !input.validity.valid);
  if (isAtLeastOneInvalid) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(formElement, inputList, settings.inactiveButtonClass, settings.submitButtonSelector);
    });
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

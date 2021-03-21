import {initialCards} from './variables.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddCardButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');

const popupList = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileInputList = Array.from(editProfilePopup.querySelectorAll('.popup__input'));
const editProfileErrorList = Array.from(editProfilePopup.querySelectorAll('.popup__error'));
const editProfilePopupTitleInput = editProfilePopup.querySelector('.popup__input_type_title');
const editProfilePopupSubtitleInput = editProfilePopup.querySelector('.popup__input_type_subtitle');
const editProfileSubmitButton = editProfilePopup.querySelector('.popup__submit-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardInputList = Array.from(addCardPopup.querySelectorAll('.popup__input'));
const addCardErrorList = Array.from(addCardPopup.querySelectorAll('.popup__error'));
const addCardPopupNameInput = addCardPopup.querySelector('.popup__input_type_name');
const addCardPopupImageLinkInput = addCardPopup.querySelector('.popup__input_type_image-link');
const addCardSubmitButton = addCardPopup.querySelector('.popup__submit-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_visible');
    closePopup(openedPopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape);
}

const clearErrors = (inputList, errorList) => {
  inputList.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
  errorList.forEach((error) => {
    error.classList.remove('popup__error_visible');
  });
}

const editProfile = () => {
  clearErrors(editProfileInputList, editProfileErrorList);
  editProfileSubmitButton.classList.remove('popup__submit-button_disabled');
  editProfileSubmitButton.removeAttribute('disabled');
  editProfilePopupTitleInput.value = profileTitle.textContent;
  editProfilePopupSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editProfilePopup);
};

const handleEditProfileSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = editProfilePopupTitleInput.value;
  profileSubtitle.textContent = editProfilePopupSubtitleInput.value;
  closePopup(editProfilePopup);
};

const addCard = () => {
  clearErrors(addCardInputList, addCardErrorList);
  addCardSubmitButton.classList.add('popup__submit-button_disabled');
  addCardSubmitButton.setAttribute('disabled', true);
  addCardPopupNameInput.value = '';
  addCardPopupImageLinkInput.value = '';
  openPopup(addCardPopup);
}

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const newCard = new Card({name: addCardPopupNameInput.value, link: addCardPopupImageLinkInput.value}, '#card');
  const newCardElement = newCard.generateCard();
  cardsContainer.prepend(newCardElement);
  closePopup(addCardPopup);
};

profileEditButton.addEventListener('click', editProfile);
editProfileSubmitButton.addEventListener('click', handleEditProfileSubmit);

profileAddCardButton.addEventListener('click', addCard);
addCardSubmitButton.addEventListener('click', handleAddCardSubmit);

const handleClosePopup = () => {
  const openedPopup = document.querySelector('.popup_visible');
  if (openedPopup !== undefined) {
    closePopup(openedPopup);
  }
}

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      handleClosePopup(evt);
    }
  });
});

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  },
  formElement);
  formValidator.enableValidation();
});

const renderInitialCards = () => {
  const cardsElements = initialCards.map((card) => {
    const newCard = new Card(card, '#card');
    return newCard.generateCard();
  });

  cardsContainer.append(...cardsElements);
};

renderInitialCards();

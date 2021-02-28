const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const editProfileForm = editProfilePopup.querySelector('.popup__form_type_edit-profile');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardInputList = Array.from(addCardPopup.querySelectorAll('.popup__input'));
const addCardErrorList = Array.from(addCardPopup.querySelectorAll('.popup__error'));
const addCardPopupNameInput = addCardPopup.querySelector('.popup__input_type_name');
const addCardPopupImageLinkInput = addCardPopup.querySelector('.popup__input_type_image-link');
const addCardForm = addCardPopup.querySelector('.popup__form_type_add-card');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close-button');

const cardTemplate = document.querySelector('#card');

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
  editProfilePopupTitleInput
  editProfilePopupSubtitleInput
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
  const newCard = makeCard(addCardPopupNameInput.value, addCardPopupImageLinkInput.value);
  cardsContainer.prepend(newCard);
  closePopup(addCardPopup);
};

const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('cards__like-button_active');
}

const handleRemoveButtonClick = (e) => {
  const card = e.target.closest('.cards__item');
  card.remove();
}

const handleCardImageClick = (e) => {
  imagePopupImage.src = e.target.src;
  imagePopupImage.alt = e.target.alt;
  imagePopupCaption.textContent = e.target.alt;
  openPopup(imagePopup);
}

const makeCard = (cardName, cardLink) => {
  const card = cardTemplate.content.cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardHeading = card.querySelector('.cards__title');
  const cardLikeButton = card.querySelector('.cards__like-button');
  const cardRemoveButton = card.querySelector('.cards__remove-button');
  cardHeading.textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = cardLink;
  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  cardRemoveButton.addEventListener('click', handleRemoveButtonClick);
  cardImage.addEventListener('click', handleCardImageClick);

  return card;
}

profileEditButton.addEventListener('click', editProfile);
editProfileForm.addEventListener('submit', handleEditProfileSubmit);

profileAddCardButton.addEventListener('click', addCard);
addCardForm.addEventListener('submit', handleAddCardSubmit);

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

const renderInitialCards = () => {
  const cardsElements = initialCards.map((card) => {
    return makeCard(card.name, card.link);
  });

  cardsContainer.append(...cardsElements);
};

renderInitialCards();

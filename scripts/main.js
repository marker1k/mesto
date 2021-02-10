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
const popupElement = document.querySelector('.popup');
const imagePopupElement = document.querySelector('.image-popup');


const popupTemplate = document.querySelector('#popup');
const cardTemplate = document.querySelector('#card');
const imagePopupTemplate = document.querySelector('#image-popup');

const togglePopup = () => {
  popupElement.classList.toggle('popup_visible');
};

const toggleImagePopup = () => {
  imagePopupElement.classList.toggle('image-popup_visible');
}

const closeImagePopup = () => {
  imagePopupElement.querySelector('.image-popup__container').remove();
  toggleImagePopup();
}

const closePopup = () => {
  popupElement.querySelector('.popup__container').remove();
  togglePopup();
}

const handleSubmit = (e) => {
  e.preventDefault();
  const target = e.target;
  const popupContainer = target.closest('.popup__container');
  if (popupContainer.classList.contains('popup_type_edit-profile')) {
    const popupTitle = popupContainer.querySelector('.popup__input_name_title');
    const popupSubtitle = popupContainer.querySelector('.popup__input_name_subtitle');
    profileTitle.innerText = popupTitle.value;
    profileSubtitle.innerText = popupSubtitle.value;
  } else if (popupContainer.classList.contains('popup_type_add-card')) {
    const placeName = popupContainer.querySelector('.popup__input_place_title');
    const placeLink = popupContainer.querySelector('.popup__input_place_link');
    const newCard = makeCard(placeName.value, placeLink.value);
    cardsContainer.prepend(newCard);
  }
  closePopup();
};

const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('cards__like-button_active');
}

const handleRemoveButtonClick = (e) => {
  const card = e.target.closest('.cards__item');
  card.remove();
}

const handleCardImageClick = (e) => {
  imagePopupElement.append(makeImagePopup(e.target.src, e.target.alt));
  toggleImagePopup();
}

const makePopup = (popupParameters) => {
  const popup = popupTemplate.content.cloneNode(true);
  const popupContainer = popup.querySelector('.popup__container');
  const popupHeadingElement = popup.querySelector('.popup__heading');
  const popupFirstInputElement = popup.querySelectorAll('.popup__input')[0];
  const popupSecondInputElement = popup.querySelectorAll('.popup__input')[1];
  const popupSubmitButton = popup.querySelector('.popup__submit-button');
  const popupCloseButton = popup.querySelector('.popup__close-button');

  popupContainer.classList.add(popupParameters.popupModificatorClass);
  popupHeadingElement.textContent = popupParameters.popupHeading;
  popupFirstInputElement.classList.add(popupParameters.firstInputClass);
  popupFirstInputElement.placeholder = popupParameters.firstInputPlaceholder;
  popupFirstInputElement.name = popupParameters.firstInputName;
  popupFirstInputElement.value = popupParameters.firstInputValue;
  popupSecondInputElement.classList.add(popupParameters.secondInputClass);
  popupSecondInputElement.placeholder = popupParameters.secondInputPlaceholder;
  popupSecondInputElement.name = popupParameters.secondInputName;
  popupSecondInputElement.value = popupParameters.secondInputValue;
  popupCloseButton.addEventListener('click', closePopup);
  popupSubmitButton.addEventListener('click', handleSubmit);

  return popup;
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

const makeImagePopup = (imagePopupLink, imagePopupText) => {
  const imagePopup = imagePopupTemplate.content.cloneNode(true);
  const imagePopupImage = imagePopup.querySelector('.image-popup__image');
  const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
  const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close-button');
  imagePopupImage.src = imagePopupLink;
  imagePopupImage.alt = imagePopupText;
  imagePopupCaption.textContent = imagePopupText;
  imagePopupCloseButton.addEventListener('click', closeImagePopup);

  return imagePopup;
}

const editProfile = () => {
  const editProfilePopup = makePopup({
    popupHeading: 'Редактировать профиль',
    firstInputClass: 'popup__input_name_title',
    firstInputPlaceholder: 'Заголовок',
    firstInputName: 'title',
    firstInputValue: profileTitle.innerText,
    secondInputClass: 'popup__input_name_subtitle',
    secondInputPlaceholder: 'Подзаголовок',
    secondInputName: 'name',
    secondInputValue: profileSubtitle.innerText,
    popupModificatorClass: 'popup_type_edit-profile'
  });

  popupElement.append(editProfilePopup);
  togglePopup();
};

const addCard = () => {
  const addCardPopup = makePopup({
    popupHeading: 'Новое место',
    firstInputClass: 'popup__input_place_title',
    firstInputPlaceholder: 'Название',
    firstInputName: 'title',
    firstInputValue: '',
    secondInputClass: 'popup__input_place_link',
    secondInputPlaceholder: 'Ссылка на картинку',
    secondInputName: 'link',
    secondInputValue: '',
    popupModificatorClass: 'popup_type_add-card'
  });
  popupElement.append(addCardPopup);
  togglePopup();
}

profileEditButton.addEventListener('click', editProfile);
profileAddCardButton.addEventListener('click', addCard);

const renderInitialCards = () => {
  const cardsElements = initialCards.map((card) => {
    return makeCard(card.name, card.link);
  });

  cardsContainer.append(...cardsElements);
};

renderInitialCards();

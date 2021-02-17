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

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupTitleInput = editProfilePopup.querySelector('.popup__input_type_title');
const editProfilePopupSubtitleInput = editProfilePopup.querySelector('.popup__input_type_subtitle');
const editProfileSubmitButton = editProfilePopup.querySelector('.popup__submit-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardPopupNameInput = addCardPopup.querySelector('.popup__input_type_name');
const addCardPopupImageLinkInput = addCardPopup.querySelector('.popup__input_type_image-link');
const addCardSubmitButton = addCardPopup.querySelector('.popup__submit-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close-button');

const cardTemplate = document.querySelector('#card');

const openPopup = (popup) => {
  popup.classList.add('popup_visible');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_visible');
}

const editProfile = () => {
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
editProfileSubmitButton.addEventListener('click', handleEditProfileSubmit);

profileAddCardButton.addEventListener('click', addCard);
addCardSubmitButton.addEventListener('click', handleAddCardSubmit);

editProfileCloseButton.addEventListener('click', () => {closePopup(editProfilePopup)});
addCardPopupCloseButton.addEventListener('click', () => {closePopup(addCardPopup)});
imagePopupCloseButton.addEventListener('click', () => {closePopup(imagePopup)});

const renderInitialCards = () => {
  const cardsElements = initialCards.map((card) => {
    return makeCard(card.name, card.link);
  });

  cardsContainer.append(...cardsElements);
};

renderInitialCards();

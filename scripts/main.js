const cards = [
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

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileAddCardButton = profile.querySelector('.profile__add-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const popupElement = document.querySelector('.popup');


const popupTemplate = document.querySelector('#popup');
const cardTemplate = document.querySelector('#card');

let togglePopup = () => {
  popupElement.classList.toggle('popup_visible');
};

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

const makePopup = (
  popupHeading,
  firstInputClass,
  firstInputPlaceholder,
  firstInputName,
  firstInputValue,
  secondInputClass,
  secondInputPlaceholder,
  secondInputName,
  secondInputValue,
  popupModificatorClass
  ) => {
  const popup = popupTemplate.content.cloneNode(true);
  const popupContainer = popup.querySelector('.popup__container');
  const popupHeadingElement = popup.querySelector('.popup__heading');
  const popupFirstInputElement = popup.querySelectorAll('.popup__input')[0];
  const popupSecondInputElement = popup.querySelectorAll('.popup__input')[1];
  const popupSubmitButton = popup.querySelector('.popup__submit-button');
  const popupCloseButton = popup.querySelector('.popup__close-button');

  popupContainer.classList.add(popupModificatorClass);
  popupHeadingElement.textContent = popupHeading;
  popupFirstInputElement.classList.add(firstInputClass);
  popupFirstInputElement.placeholder = firstInputPlaceholder;
  popupFirstInputElement.name = firstInputName;
  popupFirstInputElement.value = firstInputValue;
  popupSecondInputElement.classList.add(secondInputClass);
  popupSecondInputElement.placeholder = secondInputPlaceholder;
  popupSecondInputElement.name = secondInputName;
  popupSecondInputElement.value = secondInputValue;
  popupCloseButton.addEventListener('click', closePopup);
  popupSubmitButton.addEventListener('click', handleSubmit);

  return popup;
}

const makeCard = (cardName, cardLink) => {
  const card = cardTemplate.content.cloneNode(true);
  const cardImage = card.querySelector('.cards__image');
  const cardHeading = card.querySelector('.cards__title');
  const cardLikeButton = card.querySelector('.cards__like-button');
  cardHeading.textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = cardLink;
  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  return card;
}

const editProfile = () => {
  const editProfilePopup = makePopup(
    'Редактировать профиль',
    'popup__input_name_title',
    'Заголовок',
    'title',
    profileTitle.innerText,
    'popup__input_name_subtitle',
    'Подзаголовок',
    'name',
    profileSubtitle.innerText,
    'popup_type_edit-profile'
  );

  popupElement.append(editProfilePopup);
  togglePopup();
};

const addCard = () => {
  const addCardPopup = makePopup(
    'Новое место',
    'popup__input_place_title',
    'Название',
    'title',
    '',
    'popup__input_place_link',
    'Ссылка на картинку',
    'link',
    '',
    'popup_type_add-card'
  );
  popupElement.append(addCardPopup);
  togglePopup();
}

profileEditButton.addEventListener('click', editProfile);
profileAddCardButton.addEventListener('click', addCard);

const renderCards = () => {
  const cardsElements = cards.map((card) => {
    return makeCard(card.name, card.link);
  });

  cardsContainer.append(...cardsElements);
};

renderCards();

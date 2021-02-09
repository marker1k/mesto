let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupTitle = popup.querySelector('.popup__input_name_title');
let popupForm = popup.querySelector('.popup__form');
let popupSubtitle = popup.querySelector('.popup__input_name_subtitle');
let popupCloseButton = popup.querySelector('.popup__close-button');

let togglePopup = () => {
  popup.classList.toggle('popup_visible');
};

let editProfile = () => {
  popupTitle.value = profileTitle.innerText;
  popupSubtitle.value = profileSubtitle.innerText;
  togglePopup();
};

let saveProfile = (e) => {
  e.preventDefault();
  profileTitle.innerText = popupTitle.value;
  profileSubtitle.innerText = popupSubtitle.value;
  togglePopup();
};

profileEditButton.addEventListener('click', editProfile);
popupCloseButton.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', saveProfile);


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

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card');

const renderCards = () => {
  const cardsElements = cards.map((card) => {
    const newCard = cardTemplate.content.cloneNode(true);
    const newCardImage = newCard.querySelector('.cards__image');
    const newCardHeading = newCard.querySelector('.cards__title');
    newCardImage.src = card.link;
    newCardImage.alt = card.name;
    newCardHeading.textContent = card.name;
    return newCard;
  });

  cardsContainer.append(...cardsElements);
};

renderCards();

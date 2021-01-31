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

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupTitle = popup.querySelector('.popup__input_name_title');
let popupSubtitle = popup.querySelector('.popup__input_name_subtitle');
let popupSaveButton = popup.querySelector('.popup__submit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');

let togglePopup = () => {
  popup.classList.toggle('popup_visible');
}

profileEditButton.addEventListener('click', () => {
  popupTitle.value = profileTitle.innerText;
  popupSubtitle.value = profileSubtitle.innerText;
  togglePopup();
});

popupCloseButton.addEventListener('click', () => {
  togglePopup();
});

popupSaveButton.addEventListener('click', (e) => {
  e.preventDefault();
  profileTitle.innerText = popupTitle.value;
  profileSubtitle.innerText = popupSubtitle.value;
  togglePopup();
});



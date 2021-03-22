import {openPopup, closePopup} from './utils.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name,
    this._link = data.link,
    this._templateSelector = templateSelector,
    this._popup = document.querySelector('.image-popup')
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true)

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardHeading = this._element.querySelector('.cards__title');
    const cardImage = this._element.querySelector('.cards__image');
    cardHeading.textContent = this._name;
    cardImage.alt = this._name;
    cardImage.src = this._link;

    this._setEventListeners();

    return this._element;
  }

  _handleOpenPopup() {
    openPopup(this._popup);
  }

  _handleClosePopup() {
    closePopup();
  }

  _handleCardImageClick(e) {
    const imagePopupImage = this._popup.querySelector('.image-popup__image');
    const imagePopupCaption = this._popup.querySelector('.image-popup__caption');
    imagePopupImage.src = e.target.src;
    imagePopupImage.alt = e.target.alt;
    imagePopupCaption.textContent = e.target.alt;
    this._handleOpenPopup();
  }

  _handleLikeButtonClick(e) {
    e.target.classList.toggle('cards__like-button_active');
  }

  _handleRemoveButtonClick(e) {
    const card = e.target.closest('.cards__item');
    card.remove();
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector('.cards__image');
    const cardLikeButton = this._element.querySelector('.cards__like-button');
    const cardRemoveButton = this._element.querySelector('.cards__remove-button');

    cardImage.addEventListener('click', (e) => {
      this._handleCardImageClick(e);
    });
    cardLikeButton.addEventListener('click', (e) => {
      this._handleLikeButtonClick(e);
    });
    cardRemoveButton.addEventListener('click', (e) => {
      this._handleRemoveButtonClick(e);
    });
  }
}

export {Card};

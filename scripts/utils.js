const openPopup = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape);
}

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_visible');
    closePopup(openedPopup);
  }
}

const handleClosePopup = () => {
  const openedPopup = document.querySelector('.popup_visible');
  if (openedPopup !== undefined) {
    closePopup(openedPopup);
  }
}

export {openPopup, closePopup, handleClosePopup};

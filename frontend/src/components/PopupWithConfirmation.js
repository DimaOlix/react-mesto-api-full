import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function PopupWithConfirmation({ isOpen, onCardDelete, onClose, onCloseOverlay }) {

  return (
    <PopupWithForm
    name="confirmation"
    isOpen={`${isOpen ? 'popup_opened' : ''}`}
    onSubmit={onCardDelete}
    onClose={onClose}
    buttonText='Да'
    title='Вы уверены?'
    onCloseOverlay={onCloseOverlay}
    >
    </PopupWithForm>
  )
}
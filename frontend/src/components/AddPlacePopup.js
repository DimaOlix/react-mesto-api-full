import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useForm } from "../hooks/useForm.js";


function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  onCloseOverlay,
  editButtonText
}) {

  const{ values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    if(!isOpen) {
    setValues({});
    }
  }, [isOpen, setValues])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      title: values.place,
      link: values.link
    });
  } 

  return (
    <PopupWithForm
    onClose={onClose}
    onSubmit={handleSubmit}
    title='Новое место'
    name='add'
    buttonText={editButtonText ? 'Сохранение...' : 'Создать'}
    isOpen={`${isOpen ? 'popup_opened' : ''}`}
    onCloseOverlay={onCloseOverlay}>
    
    <input
      className="form__input form__input_value_place"
      value={values.place || ''}
      onChange={handleChange}
      type="text"
      id="place-input"
      required
      minLength="2"
      maxLength="30"
      name="place"
      placeholder="Название"
    />
    <span
      className="form__input-error form__input-error_position_top"
      id="place-input-error">
    </span>
    <input
      className="form__input form__input_value_link"
      value={values.link || ''}
      onChange={handleChange}
      type="url"
      required
      id="link-input"
      name="link"
      placeholder="Ссылка на картинку"
    />
    <span
      className="form__input-error form__input-error_position_button"
      id="link-input-error">
    </span>
  </PopupWithForm>
  )
}

export default AddPlacePopup;
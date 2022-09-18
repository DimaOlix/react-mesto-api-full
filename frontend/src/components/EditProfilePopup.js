import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from "./PopupWithForm.js";
import { useForm } from "../hooks/useForm.js";


function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseOverlay }) {

  const currentUser = React.useContext(CurrentUserContext);
  const{values, handleChange, setValues} = useForm({name: '', activity: ''});

  React.useEffect(() => {
    setValues({name: currentUser.name, activity: currentUser.about});
  }, [currentUser, isOpen, setValues])

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: values.name,
      about: values.activity
    });
  } 

  return (
    <PopupWithForm
      onClose={onClose}
      title='Редактировать профиль'
      name='edit'
      buttonText='Сохранить'
      isOpen={`${isOpen ? 'popup_opened' : ''}`}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        className="form__input form__input_value_name"
        type="text"
        name="name"
        id="name-input"
        value={values.name}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
        />
      <span
        className="form__input-error form__input-error_position_top"
        id="name-input-error">
      </span>

      <input
        className="form__input form__input_value_activity"
        type="text"
        name="activity"
        id="activity-input"
        value={values.activity}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="200"
        />
      <span
        className="form__input-error form__input-error_position_button"
        id="activity-input-error">
      </span>
    </PopupWithForm>  
  )
}

export default EditProfilePopup;
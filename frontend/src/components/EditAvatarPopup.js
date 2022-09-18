import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onCloseOverlay }) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    if(!isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
  <PopupWithForm
    onClose={onClose}
    title='Обновить аватар'
    name='avatar'
    buttonText='Сохранить'
    isOpen={`${isOpen ? 'popup_opened' : ''}`}
    onSubmit={handleSubmit}
    onCloseOverlay={onCloseOverlay}
  >
    <input
      className="form__input form__input_value_link"
      type="url"
      ref={avatarRef}
      required
      id="link-avatar"
      name="link"
      placeholder="Ссылка на фотографию"
    />
    <span
      className="form__input-error form__input-error_position_top"
      id="link-avatar-error">
    </span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;
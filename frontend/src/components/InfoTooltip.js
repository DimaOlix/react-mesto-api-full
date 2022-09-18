import React from "react";
import InfoTooltipOk from '../images/InfoTooltipOk.svg';
import InfoTooltipErr from '../images/InfoTooltipErr.svg';


function InfoTooltip({ isOpen, onClose, statusRegister, onCloseOverlay }) {

  return (
    <div onClick={onCloseOverlay} className={`popup ${ isOpen }`}>
      <div className="popup__container">
      <button
      className={`popup__close`}
      type="button"
      aria-label="Закрыть"
      onClick={onClose}></button>
        <img className="popup__image" src={ statusRegister ? InfoTooltipOk : InfoTooltipErr } alt="Картинка"/>
        <p className="popup__text">{ statusRegister ? 
        'Вы успешно зарегистрировались!' : 
        'Что-то пошло не так! Попробуйте ещё раз.' }</p>         
      </div>
      
    </div>
  )
}

export default InfoTooltip;
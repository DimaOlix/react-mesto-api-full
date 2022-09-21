import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function Card({
  card, 
  onCardClick, 
  onCardLike, 
  onConfirmationDelete, 
  onCardDeleteClick
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
  );
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onConfirmationDelete();
    onCardDeleteClick(card);
  }
  

  return (
    <li className="element">
      
      <button
      className={cardDeleteButtonClassName}
      type="button"
      aria-label="Удалить фото"
      onClick={handleDeleteClick}></button>

      <img src={card.link} className="element__image" onClick={handleClick} alt={card.name}/>
      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        
        <div className="element__like-content">
          <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Лайк"
          onClick={handleLikeClick}></button>
          <p className="element__like-quantity">{card.likes.length}</p>
        </div>
        
      </div>
    </li>
  )
}

export default Card;

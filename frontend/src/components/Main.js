import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function Main({ 
  cards,
  onCardLike,
  onCardDelete,
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick,
  onConfirmationDelete,  
  onCardDeleteClick,
}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div 
          className="profile__avatar" 
          onClick={onEditAvatar}
          style={ {backgroundImage: `url(${currentUser.avatar})`} }>
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <button 
          className="profile__edit-button" 
          onClick={onEditProfile} 
          type="button" 
          aria-label="Изменить">          
        </button>
        <p className="profile__activity">{currentUser.about}</p>
        <button 
          type="button" 
          className="profile__add-button" 
          onClick={onAddPlace} aria-label="Добавить">            
        </button>

      </section>

      <section className="elements">
        <ul className="elements__container">          
          {cards.map((card) => (
            <Card
              card={card} 
              onCardClick={onCardClick} 
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onConfirmationDelete={onConfirmationDelete}
              onCardDeleteClick={onCardDeleteClick}
            />  
          ))}
        </ul>
      </section>
    </>
  )
}

export default Main;
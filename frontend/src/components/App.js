import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Main from './Main.js';
import ImagePopup from './ImagePopup';
import Footer from './Footer.js';
import Api from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ApiAuth from '../utils/ApiAuth.js'


function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState(null);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({ '_id': '', 'email': '' });
  const history = useHistory();
  const [statusRegister, setStatusRegistr] = React.useState(null);
  const [registerConfirmation, setRegisterConfirmation] = React.useState(false);

  const [editButtonText, setEditButtonText] = React.useState(false);
  
  const isOpen = isEditAvatarPopupOpen 
  || isEditProfilePopupOpen 
  || isAddPlacePopupOpen
  || registerConfirmation
  || selectedCard;


  React.useEffect(() => {
    if (loggedIn) {
      Api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      Api.getCardsInfo()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err))
    }
  }, [loggedIn])

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  React.useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      tokenCheck();
    }
  }, [loggedIn])

  React.useEffect(() => {
    if(loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history])

  function tokenCheck() {    
    ApiAuth.getEmail()
    .then((res) => {    
        setUserInfo({
          '_id': res._id,
          'email': res.email,
        });

        setLoggedIn(true);
    })
    .catch((err) => console.log(err))
  }

  function requestLogin({ values }) {
    ApiAuth.autorise({ values })
    .then((res) => {
      setUserInfo({'email': values.login});
      // setLoggedIn(true);
      // localStorage.setItem('loggedIn', true)
      setLoggedIn(() => {
        localStorage.setItem('loggedIn', true)
        return true;
      });
    })
    .catch((err) => console.log(err))
  }

  function requestRegister({ values }) {
    return ApiAuth.registr({ values })
    .then((res) => {
      setStatusRegistr(true);    
      setTimeout(() => setRegisterConfirmation(true), 0);
      history.push('/sign-in');
    })
    .catch(() => {
      setStatusRegistr(false);
      setTimeout(() => setRegisterConfirmation(true), 0);
      history.push('/sign-up');
    })
  }

  function handleSignOut() {
    ApiAuth.exitThe()
    .then(() => {
      // setLoggedIn(false);
      // localStorage.setItem('loggedIn', false)
      setLoggedIn(() => {
        localStorage.setItem('loggedIn', false)
        return false;
      })
    })
    .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    Api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) =>
        c._id === card._id ? newCard : c
      ));
    })
    .catch((err) => console.log(err))
  }

  function deleteCard() {
    Api.deleteCard(selectedCardDelete._id)
    .then(() => {
      setCards((state) => {
        return state.filter((c) => {
          return c._id !== selectedCardDelete._id;
        })
      });
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({title, link}) {
    setEditButtonText(true);
    Api.addCard(title, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(err))
    .finally(() => setEditButtonText(false))
  }

  function handleUpdateUser({name, about}) {
    Api.editUserInfo(name, about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    Api.editAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }          
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationDelete() {
    setIsConfirmationPopupOpen(true);
  }
  
  function handleCardDeleteClick(card) {
    setSelectedCardDelete(card);
  }

  function handleDeleteCard(e) {
    e.preventDefault();
    deleteCard();
    setSelectedCardDelete(null);
  }

  function handleCloseOverlay(evt) {
    return evt.target.classList.contains('popup_opened') && closeAllPopups();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setRegisterConfirmation(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <ProtectedRoute
        loggedIn={loggedIn}  
        path='/'
        userInfo={userInfo}
        setLoggedIn={setLoggedIn}
        handleSignOut={handleSignOut}
        component={Header}  />
        
        <Switch>

          <Route path='/sign-in'>
            <Login requestLogin={requestLogin} />
          </Route>

          <Route path='/sign-up'>
            <Register requestRegister={requestRegister} />
          </Route>

          <ProtectedRoute 
          loggedIn={loggedIn}  
          path='/' 
          component={Main}          
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDeleteClick={handleCardDeleteClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onConfirmationDelete={handleConfirmationDelete} />

          <Route>
            { loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' /> }
          </Route>

        </Switch>

        <InfoTooltip 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="ok"
        />        

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={handleCloseOverlay}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          onCloseOverlay={handleCloseOverlay}
        />
      
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onCloseOverlay={handleCloseOverlay}
          editButtonText={editButtonText}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseOverlay={handleCloseOverlay}
        />

        <PopupWithConfirmation
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleDeleteCard}
        onCloseOverlay={handleCloseOverlay}
        >
        </PopupWithConfirmation>

        <ProtectedRoute
        loggedIn={loggedIn}  
        path='/' 
        component={Footer} 
        />

        <InfoTooltip
        setStatusRegistr={setStatusRegistr}
        statusRegister={statusRegister}
        isOpen={ registerConfirmation ? 'popup_opened' : '' } 
        onClose={closeAllPopups}
        onCloseOverlay={handleCloseOverlay}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
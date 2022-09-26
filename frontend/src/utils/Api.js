class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  _getResponseServer(res) {
    if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCardsInfo() {
    return fetch(`${this.url}/cards`, {
      headers: {
        'Content-type': 'application/json', 
        authorization: this.token
      },
      credentials: "include", 
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: { 
        'Content-type': 'application/json', 
      },  
      credentials: "include", 
    })
    .then((res) => {
        return this._getResponseServer(res);
    })
  }

  editUserInfo(name, about) {
    return fetch( `${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include", 
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  }

  editAvatar(link) {
    return fetch( `${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include", 
      body: JSON.stringify({
        avatar: link,
      })
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  }

  addCard(title, link) {
    return fetch( `${this.url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include", 
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  }

  deleteCard(cardId) {
    return fetch( `${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch( `${this.url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  }
}

export default new Api('https://api.dolih.student.nomoredomains.sbs');

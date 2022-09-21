class ApiAuth {
  constructor(url) {
    this.url = url;
  }

  _checkResponse(res) {
    if(res.ok) { 
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`)
    }
  }

  registr({ values }) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify({
        "password": values.password,
        "email": values.login
      }) 
    })
    .then(res => this._checkResponse(res));
  }

  autorise({ values }) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        "password": values.password,
        "email": values.login
      }),
    },
)
    .then(res => this._checkResponse(res));
  }

  getEmail() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },      
      credentials: "include",
    })
    .then(res => this._checkResponse(res));
  }

  exitThe() {
    return fetch(`${this.url}/signout`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
      }
    });
  }
}

export default new ApiAuth('http://localhost:3001');
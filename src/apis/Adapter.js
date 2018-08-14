import { BadTokenError } from '../error.js';

const API = 'http://localhost:3000';

export default class Adapter {
  static getToken() {
    return localStorage.getItem('token');
  }

  static deleteToken() {
    localStorage.removeItem('token');
  }

  // static getUserScores(id) {
  //   return fetch(`${API}/users/${id}/scores`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': this.getToken(),
  //     }
  //   })
 	//     .then(r => r.json())
  // }
  //
  // static getUserEvents(id) {
  //   return fetch(`${API}/users/${id}/events`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': this.getToken(),
  //     }
  //   })
 	//     .then(r => r.json())
  // }

  static getCurrentUser() {
    fetch("http://localhost:3000/api/v1/current_user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getToken(),
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        throw new BadTokenError("Bad token")
      } else {
        throw new Error("Unhandled error")
      }
    })
  }

  // static postLoginUser(username, password) {
  //   return fetch('http://localhost:3000/sessions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password })
  //     })
  //       .then(res => res.json())
  // }
}

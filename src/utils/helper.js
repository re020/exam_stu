

const TOKEN_NAME = '__@token';
export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_NAME, token);
}

const USER_KEY = '__@user';
export function setLocalUserInfo(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getLocalUserInfo() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

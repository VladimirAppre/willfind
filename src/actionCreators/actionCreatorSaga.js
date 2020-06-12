import actionTypes from "../redux/actionTypes";

// Это тригерит саму сагу.
export function loadToDoSaga() {
  return { type: actionTypes.loadToDoSaga };
}
export function loginSaga(email, password) {
  return { type: actionTypes.loginSaga, email, password }
}
export function logoutSaga() {
  return { type: actionTypes.logoutSaga };
}
export function registerSaga(name, email, password, repeadPassword) {
  return { type: actionTypes.registerSaga, name, email, password, repeadPassword }
}

// Эти сага вызывает с помощью put() в тех или иных случаях.
export function loadingStart() {
  return { type: actionTypes.loadingStart };
}

export function loadingSuccess(url) {
  return { type: actionTypes.loadingSuccess, url };
}

export function loadingError(errorMessage) {
  return { type: actionTypes.loadingError, errorMessage };
}

export function loginFetch(email, password) {
  console.log(email, password)
  return { type: actionTypes.loginFetch, email, password };
}

export function logoutFetch(loginSessions) {
  return { type: actionTypes.logoutFetch, loginSessions };
}

export function registerFetch(name, email, password, repeadPassword) {
  return { type: actionTypes.registerFetch, name, email, password, repeadPassword };
}
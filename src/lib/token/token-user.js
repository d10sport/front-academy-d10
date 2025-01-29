import { jwtDecode } from "jwt-decode";

async function isTokenValid(token) {
  debugger;
  let msg = 'Token valid'
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      deleteToken();
      msg = 'Token has expired';
      return msg;
    }
    return msg;
  } catch {
    msg = 'Invalid token';
    return msg;
  }
}

async function getDataToken() {
  const tokenGet = await getToken();
  if (!tokenGet) {
    return [];
  }
  const decoded = jwtDecode(tokenGet);
  return decoded.user;
}

async function getToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const valid = await isTokenValid(token);
  if (valid != 'Token valid') {
    return false;
  }
  return token;
}

async function saveToken(token) {
  localStorage.setItem('token', token);
  return true;
}

async function updateToken(token) {
  const valid = await isTokenValid(token);
  if (!valid) {
    console.error('Invalid token');
    return false;
  }
  saveToken(token);
}

async function deleteToken() {
  localStorage.removeItem('token');
}

export { isTokenValid, getToken, updateToken, saveToken, deleteToken, getDataToken };
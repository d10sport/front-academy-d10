import { jwtDecode } from "jwt-decode";

async function isTokenValid(token) {
    debugger;
    let msg = 'Token valid'
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            msg = 'Token has expired';
            return msg;
        }
        return msg;
    } catch {
        msg = 'Invalid token';
        return msg;
    }
}

export default async function getTokenDecoded(token) {
    debugger;
    if (!token) {
        return false;
    }
    const valid = await isTokenValid(token);
    if (valid != 'Token valid') {
        return false;
    }
    return token;
}
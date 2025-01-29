import { jwtDecode } from "jwt-decode";

async function isTokenValid(token) {
    let msg = 'Token valid'
    let decoded = {};
    try {
        decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            decoded = {}
            msg = 'Token has expired';
            return { decoded, msg };
        }
        return { decoded, msg };
    } catch {
        msg = 'Invalid token';
        return { decoded, msg };
    }
}

export default async function getTokenDecoded(token) {
    if (!token) {
        return false;
    }
    const { decoded, msg } = await isTokenValid(token);
    if (msg != 'Token valid' && Object.keys(decoded).length == 0) {
        return false;
    }
    return decoded;
}
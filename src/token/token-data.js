import { jwtDecode } from "jwt-decode";

export default async function getTokenDecoded(token) {
    if (!token) {
        return false;
    }
    const decoded = await jwtDecode(token);

    return decoded;
}
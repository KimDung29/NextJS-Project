import axios from 'axios';
import store from '../store';
;

export function parseJwt(accessToken: string) {
    if (!accessToken) { return; }
   const base64Url = accessToken?.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return base64;
    // return JSON.parse(atob(base64));
}

export const getToken = (token = '') => {

    return token;
}

export const token = getToken() !== '' ? getToken() : 'tn'
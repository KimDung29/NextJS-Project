 export function parseJwt(accessToken: string) {
    if (!accessToken) { return; }
   const base64Url = accessToken?.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
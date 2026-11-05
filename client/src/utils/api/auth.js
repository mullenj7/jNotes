import { jwtDecode } from 'jwt-decode'

const API_DOMAIN = process.env.REACT_APP_API;
const ENDPOINT = 'auth';

export const signUp = async (body) => {
    try {
        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/register`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            },
        );
        if (response.status === 200) {

            const parsedResponse = await response.json();
            console.log(parsedResponse)
            return parsedResponse.user;
        }

        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const signIn = async (email, password) => {
    try {
        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/login`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            },
        );

        const parsedResponse = await response.json();
        console.log(parsedResponse);
        return parsedResponse
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const isTokenValid = (token) => {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    const now = new Date();
    return now.getTime() <= (exp * 1000);
}
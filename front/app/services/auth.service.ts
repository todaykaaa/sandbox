
import { AuthToken } from './auth.token'

const API_URL = process.env.NEXT_PUBLIC_REST_URL + '/auth/login';

class AuthService {

    login(values) {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.access_token) {
                    const Token = new AuthToken(data.access_token)
                }

                return data;
            })
    }

}

export default new AuthService()
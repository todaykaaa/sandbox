
import { AuthToken } from './auth.token'
import { Config } from 'config/main.config'

const restAuthUrl = Config.apiHost
    + Config.apiPath
    + Config.servicePath.auth;

class AuthService {

    login(values) {
        return fetch(restAuthUrl + '/login', {
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
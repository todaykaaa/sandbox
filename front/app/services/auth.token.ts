import Cookie from 'js-cookie';

export type DecodedToken = {
    readonly username: string;
    readonly exp: number;
    readonly iat: number;
    readonly sub: number;
}

export const TOKEN_STORAGE_KEY = "jwtToken";

export class AuthToken {
    readonly decodedToken: DecodedToken;

    constructor(readonly token?: string) {

        this.decodedToken = { username: "", exp: 0, iat: 0, sub: 0 };

        try {
            if (token) {
                this.decodedToken = JSON.parse(atob(token.split('.')[1]));
                this.storeToken(token);
            }
        } catch (e) {
            throw e
        }
    }

    get authorizationString() {
        return `Bearer ${this.token}`;
    }

    get expiresAt(): Date {
        return new Date(this.decodedToken.exp * 1000);
    }

    get isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    get isValid(): boolean {
        return !this.isExpired;
    }

    private storeToken(token: string) {
        Cookie.set(TOKEN_STORAGE_KEY, token);
    }
}
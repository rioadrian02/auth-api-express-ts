interface LoginUserPayload {
    username: string;
    password: string;
}

class LoginUser {
    username: string;
    password: string;

    constructor({ username, password }: LoginUserPayload) {
        this._verifyPayload({ username, password });

        this.username = username;
        this.password = password;
    }

    private _verifyPayload({ username, password }: LoginUserPayload) :void {
        if(!username || !password) {
            throw new Error('LOGIN_USER.MISSING_REQUIRED_PROPERTY');
        }

        if(typeof username !== 'string' || typeof password !== 'string') {
            throw new Error('LOGIN_USER.WRONG_DATA_TYPE');
        }
    }
}

export default LoginUser;
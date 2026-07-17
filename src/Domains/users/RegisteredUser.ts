interface RegisteredUserPayload {
    id: string;
    username: string;
    fullname: string;
}

class RegisteredUser {
    id: string;
    username: string;
    fullname: string;

    constructor({ id, username, fullname }: RegisteredUserPayload) {
        this._verifyPayload({ id, username, fullname });

        this.id = id;
        this.username = username;
        this.fullname = fullname;
    }

    private _verifyPayload({ id, username, fullname }: RegisteredUserPayload): void {
        if(!id || !username || !fullname) {
            throw new Error('REGISTERED_USER.MISSING_REQUIRED_PROPERTY');
        }

        if(typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
            throw new Error('REGISTERED_USER.WRONG_DATA_TYPE');
        }
    }
}

export default RegisteredUser;
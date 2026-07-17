interface UpdateFullnamePayload {
    fullname: string
}

class UpdateFullname{
    fullname: string;

    constructor({ fullname }: UpdateFullnamePayload) {
        this._verifyFullname(fullname);

        this.fullname = fullname;
    }

    private _verifyFullname(fullname: string) : void {
        if(!fullname) {
            throw new Error('UPDATE_FULLNAME.MISSING_REQUIRED_PROPERTY');
        }

        if(typeof fullname !== 'string') {
            throw new Error('UPDATE_FULLNAME.WRONG_DATA_TYPE');
        }
    }
}

export default UpdateFullname;
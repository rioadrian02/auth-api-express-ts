import bcrypt from 'bcrypt';
import { PasswordHash } from '../../Applications/use_case/AddUserUseCase.js';

class BcryptPasswordHash implements PasswordHash {
    private _saltRound: number;
    constructor(saltRound = 10) {
        this._saltRound = saltRound;
    }

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this._saltRound);
    }

    async comparePassword (password: string, hashedPassword: string) :Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}

export default BcryptPasswordHash;
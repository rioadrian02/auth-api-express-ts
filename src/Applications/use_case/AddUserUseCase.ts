import RegisterUser from "../../Domains/users/RegisterUser.js";
import UserRepository, { IRegisteredUser } from "../../Domains/users/UserRepository.js";


export interface PasswordHash {
    hash(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

interface AddUserUseCaseDependencies {
    userRepository: UserRepository;
    passwordHash: PasswordHash;
}

interface IUseCasePayload {
    username: string;
    password: string;
    fullname: string;
}

class AddUserUseCase {
    private _userRepository: UserRepository;
    private _passwordHash: PasswordHash;
    constructor({ userRepository, passwordHash }: AddUserUseCaseDependencies) {
        this._userRepository = userRepository;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload: IUseCasePayload) :Promise<IRegisteredUser> {
        // validasi data menggunakan Domain
        const registerUser = new RegisterUser(useCasePayload);

        // cek apaka username sudah dipakai
        await this._userRepository.verifyAvailableUsername(registerUser.username);

        // hash password
        const hashedPassword = await this._passwordHash.hash(registerUser.password);

        // simpan ke database
        const registeredUser = await this._userRepository.addUser({
            username: registerUser.username,
            password: hashedPassword,
            fullname: registerUser.fullname
        });

        return registeredUser;
    }
}

export default AddUserUseCase;
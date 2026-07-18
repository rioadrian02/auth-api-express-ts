import AuthenticationError from "../../Commons/exceptions/AuhtenticationError.js";
import LoginUser from "../../Domains/users/LoginUser.js";
import UserRepository from "../../Domains/users/UserRepository.js";
import AuthenticationRepository from "../../Domains/authentications/AuthenticationRepository.js";
import TokenManager from "../../Domains/authentications/TokenManager.js";
import { PasswordHash } from "./AddUserUseCase.js";

interface LoginUserUseCaseDependencies {
    userRepository: UserRepository;
    authenticationRepository: AuthenticationRepository;
    tokenManager: TokenManager;
    passwordHash: PasswordHash;
}

interface IUseCasePayload{
    username: string;
    password: string;
}

interface LoginResult {
    accessToken: string;
    refreshToken: string;
}

class LoginUserUseCase {
    private _userRepository: UserRepository;
    private _authenticationRepository: AuthenticationRepository;
    private _tokenManager: TokenManager;
    private _passwordHash: PasswordHash;

    constructor({ userRepository, authenticationRepository, tokenManager, passwordHash }: LoginUserUseCaseDependencies) {
        this._userRepository = userRepository;
        this._authenticationRepository = authenticationRepository;
        this._tokenManager = tokenManager;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload: IUseCasePayload) :Promise<LoginResult> {
        // validasi
        const { username, password } = new LoginUser(useCasePayload);

        // 
        const hashedPassword = await this._userRepository.getPasswordByUsername(username);

        const isPasswordMatch = await this._passwordHash.comparePassword(password, hashedPassword);

        if(!isPasswordMatch) {
            throw new AuthenticationError('LOGIN_USER.WRONG_PASSWORD');
        }

        const userId = await this._userRepository.getIdByUsername(username);

        // generate access token
        const accessToken = await this._tokenManager.createAccessToken({ userId, username });
        const refreshToken = await this._tokenManager.createRefreshToken({ userId, username });

        await this._authenticationRepository.addToken(refreshToken, userId);

        return { accessToken, refreshToken };
    }
}

export default LoginUserUseCase;
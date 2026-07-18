import AuthenticationRepository from "../../Domains/authentications/AuthenticationRepository.js";
import TokenManager from "../../Domains/authentications/TokenManager.js";

interface IRefreshAuthUseCaseDependencies {
    authenticationRepository: AuthenticationRepository;
    tokenManager: TokenManager;
}

interface RefreshAuthResult {
    accessToken: string;
}

class RefreshAuthenticationUseCase {
    private _authenticationRepository: AuthenticationRepository;
    private _tokenManager: TokenManager;

    constructor({ authenticationRepository, tokenManager }: IRefreshAuthUseCaseDependencies) {
        this._authenticationRepository = authenticationRepository;
        this._tokenManager = tokenManager;
    }

    async execute({ refreshToken }: {refreshToken: string}): Promise<RefreshAuthResult> {
        await this._authenticationRepository.checkAvailabilityToken(refreshToken);

        await this._tokenManager.verifyRefreshToken(refreshToken);

        const { userId, username } = await this._tokenManager.decodePayload(refreshToken);

        const accessToken = await this._tokenManager.createAccessToken({ userId, username });

        return { accessToken };
    }
}
export default RefreshAuthenticationUseCase;
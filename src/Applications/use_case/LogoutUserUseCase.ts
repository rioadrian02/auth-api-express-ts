import AuthenticationRepository from "../../Domains/authentications/AuthenticationRepository.js";

interface LogoutUserUseCaseDependencies {
    authenticationRepository: AuthenticationRepository;
}

class LogoutUserUseCase {
    private _authenticationRepository: AuthenticationRepository;

    constructor({ authenticationRepository }: LogoutUserUseCaseDependencies) {
        this._authenticationRepository = authenticationRepository;
    }

    async execute({ refreshToken }: {refreshToken: string}): Promise<void> {
        await this._authenticationRepository.checkAvailabilityToken(refreshToken);
        await this._authenticationRepository.deleteToken(refreshToken);
    }
}

export default LogoutUserUseCase;
abstract class AuthenticationRepository {
    async addToken(token: string, userId: string) :Promise<void> {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async checkAvailabilityToken(token: string) :Promise<void> {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteToken(token: string) :Promise<void> {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async deleteAllTokenByUserId(userId: string) :Promise<void> {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

export default AuthenticationRepository;
export interface TokenPayload {
    userId: string;
    username: string;
}

abstract class TokenManager {
    async createAccessToken(payload: TokenPayload) :Promise<string> {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async createRefreshToken(payload: TokenPayload) :Promise<string> {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async verifyRefreshToken(token: string) :Promise<void> {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async decodePayload(token: string) :Promise<TokenPayload> {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
}

export default TokenManager;
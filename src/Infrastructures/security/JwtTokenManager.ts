import jwt from 'jsonwebtoken';
import TokenManager, {TokenPayload} from '../../Domains/authentications/TokenManager.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';

class JwtTokenManager extends TokenManager {
    async createAccessToken(payload: TokenPayload): Promise<string> {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: '30m'});
    }

    async createRefreshToken(payload: TokenPayload): Promise<string> {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY as string);
    }

    async verifyRefreshToken(token: string): Promise<void> {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_KEY as string);
        } catch {
            throw new InvariantError('Refresh token tidak valid');
        }
    }

    async decodePayload(token: string): Promise<TokenPayload>{
        try {
            return jwt.decode(token) as TokenPayload;
        } catch {
            throw new InvariantError('Token tidak valid');
        }
    }
}

export default JwtTokenManager;
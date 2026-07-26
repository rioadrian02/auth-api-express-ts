import { jest } from '@jest/globals';
import RefreshAuthenticationUseCase from '../use_case/RefreshAuthenticationUseCase.js';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository.js';
import TokenManager, { TokenPayload } from '../../Domains/authentications/TokenManager.js';

describe('RefreshAuthenticationUseCase', () => {
    test('harus mengembalikan acces token kalau berhasil', async () => {
        const useCasePayload = {
            refreshToken: 'my_refresh_token_gw'
        }

        const mockAuthenticationRepository = {
            checkAvailabilityToken: jest.fn<() => Promise<void>>().mockResolvedValue()
        } as unknown as AuthenticationRepository;

        const mockTokenManager = {
            verifyRefreshToken: jest.fn<() => Promise<void>>().mockResolvedValue(),
            decodePayload: jest.fn<() => Promise<TokenPayload>>().mockResolvedValue({userId: 'user-123', username: 'username123'}),
            createAccessToken: jest.fn<() => Promise<string>>().mockResolvedValue('access_token_123')
        } as unknown as TokenManager;

        const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
            authenticationRepository: mockAuthenticationRepository,
            tokenManager: mockTokenManager
        });

        const result = await refreshAuthenticationUseCase.execute(useCasePayload);

        expect(result).toEqual({ accessToken: 'access_token_123' });

        expect(mockAuthenticationRepository.checkAvailabilityToken).toHaveBeenCalledWith('my_refresh_token_gw');

        expect(mockTokenManager.verifyRefreshToken).toHaveBeenCalledWith('my_refresh_token_gw');

        expect(mockTokenManager.decodePayload).toHaveBeenCalledWith('my_refresh_token_gw');

        expect(mockTokenManager.createAccessToken).toHaveBeenCalledWith({ userId: 'user-123', username: 'username123'});
    });
});
import { jest } from '@jest/globals';
import LoginUserUseCase from '../use_case/LoginUserUseCase.js';
import UserRepository from '../../Domains/users/UserRepository.js';
import { PasswordHash } from '../use_case/AddUserUseCase.js';
import TokenManager from '../../Domains/authentications/TokenManager.js';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository.js';

describe('LoginUserUseCase', () => {
    test('harus berhasil login dan mengembalikan access token dan refresh token', async () => {
        const useCasePayload = {
            username: 'budi',
            password: 'rahasia123'
        }

        const mockUserRepository = {
            getPasswordByUsername: jest.fn<() => Promise<string>>().mockResolvedValue('hashed_password'),
            getIdByUsername: jest.fn<() => Promise<string>>().mockResolvedValue('user-123'),
        } as unknown as UserRepository;

        const mockPasswordHash = {
            comparePassword: jest.fn<() => Promise<boolean>>().mockResolvedValue(true)
        } as unknown as PasswordHash

        const mockTokenManager = {
            createAccessToken: jest.fn<() => Promise<string>>().mockResolvedValue('access_token_123'),
            createRefreshToken: jest.fn<() => Promise<string>>().mockResolvedValue('refresh_token_123'),
        } as unknown as TokenManager;

        const mockAuthenticationRepository = {
            addToken: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
        } as unknown as AuthenticationRepository;

        const loginUserUseCase = new LoginUserUseCase({
            userRepository: mockUserRepository,
            authenticationRepository: mockAuthenticationRepository,
            tokenManager: mockTokenManager,
            passwordHash: mockPasswordHash
        });

        const result = await loginUserUseCase.execute(useCasePayload);

        expect(result).toEqual({
            accessToken: 'access_token_123',
            refreshToken:'refresh_token_123'
        });

        expect(mockUserRepository.getPasswordByUsername).toHaveBeenCalledWith('budi');

        expect(mockUserRepository.getIdByUsername).toHaveBeenCalledWith('budi');

        expect(mockPasswordHash.comparePassword).toHaveBeenCalledWith('rahasia123', 'hashed_password');

        expect(mockTokenManager.createAccessToken).toHaveBeenCalledWith({
            userId: 'user-123',
            username: 'budi'
        });

        expect(mockTokenManager.createRefreshToken).toHaveBeenCalledWith({
            userId: 'user-123',
            username: 'budi'
        });

        expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith('refresh_token_123', 'user-123');
    });

    test('harus error jika password salah', async () => {
        const useCasePayload = {
            username: 'budi',
            password: 'rahasia123'
        }

        const mockUserRepository = {
            getPasswordByUsername: jest.fn<() => Promise<string>>().mockResolvedValue('hashed_password'),
            getIdByUsername: jest.fn()
        } as unknown as UserRepository;

        const mockPasswordHash = {
            comparePassword: jest.fn<() => Promise<boolean>>().mockResolvedValue(false),
        } as unknown as PasswordHash;

        const mockTokenManager = {
            createAccessToken: jest.fn(),
            createRefreshToken: jest.fn(),
        } as unknown as TokenManager;

        const mockAuthenticationRepository = {
            addToken: jest.fn()
        } as unknown as AuthenticationRepository;

        const loginUserUseCase = new LoginUserUseCase({
            userRepository: mockUserRepository,
            authenticationRepository: mockAuthenticationRepository,
            tokenManager: mockTokenManager,
            passwordHash: mockPasswordHash,
        });


        await expect(loginUserUseCase.execute(useCasePayload)).rejects.toThrow('LOGIN_USER.WRONG_PASSWORD');

        expect(mockUserRepository.getIdByUsername).not.toHaveBeenCalled();
        expect(mockTokenManager.createAccessToken).not.toHaveBeenCalled();
        expect(mockTokenManager.createRefreshToken).not.toHaveBeenCalled();
        expect(mockAuthenticationRepository.addToken).not.toHaveBeenCalled();

    });
});
import { jest } from '@jest/globals';
import RegisterUser, { RegisterUserPayload } from '../users/RegisterUser.js';

describe('RegsiterUser', () => {
    test('harus error jika property tidak lengkap', () => {
        expect(()=> new RegisterUser({
            username: 'user',
            password: 'password123'
        } as RegisterUserPayload)).toThrow('REGISTER_USER.MISSING_REQUIRED_PROPERTY');
    });

    test('harus error jika tipe data tidak sesuai', () => {
        expect(()=> new RegisterUser({
            username: 123 as unknown as string,
            password: 'password123',
            fullname: 'Jhonson'
        })).toThrow('REGISTER_USER.WRONG_DATA_TYPE');
    });

    test('harus errpr jika username lebih dari 50 karakter', () => {
        expect(()=> new RegisterUser({
            username: 'a'.repeat(51),
            password: 'rahasia123',
            fullname: 'Jhonson',
        })).toThrow('REGISTER_USER.USERNAME_LIMIT_CHAR');
    });

    test('harus error jika username mengandung karakter terlarang', () => {
        expect(() => new RegisterUser({
            username: 'budi santoso',
            password: 'rahasia123',
            fullname: 'Budi Santoso',
        })).toThrow('REGISTER_USER.USERNAME_CONTAIN_FORBIDDEN_CHARACTER');
    });

    test('harus berhasil jika data valid', () => {
        const registerUser = new RegisterUser({
            username: 'budi',
            password: 'password123',
            fullname: 'Jhonson'
        });

        expect(registerUser.username).toBe('budi');
        expect(registerUser.password).toBe('password123');
        expect(registerUser.fullname).toBe('Jhonson');
    });
});
import UserRepository from '../../Domains/users/UserRepository.js';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository.js';
import withTransaction from '../../Infrastructures/database/transaction.js';
import { PoolClient } from 'pg';

interface DeleteUserUseCaseDependencies {
    userRepository: UserRepository;
    authenticationRepository: AuthenticationRepository;
}

class DeleteUserUseCase {
    private _userRepository: UserRepository;
    private _authenticationRepository: AuthenticationRepository;

    constructor({ userRepository, authenticationRepository}: DeleteUserUseCaseDependencies) {
        this._userRepository = userRepository;
        this._authenticationRepository = authenticationRepository;
    }

    async execute({ userId }: {userId: string}) : Promise<void>{
        await this._userRepository.getUserById(userId);

        await withTransaction(async (client: PoolClient) => {
            await this._authenticationRepository.deleteAllTokenByUserId(userId, client);
            await this._userRepository.deleteUser(userId);
        });
    }

}

export default DeleteUserUseCase;
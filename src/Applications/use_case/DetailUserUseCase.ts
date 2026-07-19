import UserRepository, { IRegisteredUser } from "../../Domains/users/UserRepository.js";

interface DetailUseCaseDependencies {
    userRepository: UserRepository;
}

class DetailUserUseCase {
    private _userRepository: UserRepository;

    constructor({ userRepository }: DetailUseCaseDependencies) {
        this._userRepository = userRepository;
    }

    async execute(data: {id: string}) :Promise<IRegisteredUser> {
        const { id } = data;

        return await this._userRepository.getUserById(id);
    }
}

export default DetailUserUseCase;
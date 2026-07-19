import UpdateFullname from '../../Domains/users/UpdateFullname.js';
import UserRepository, { IUser } from '../../Domains/users/UserRepository.js';

interface UpdateFullnameUseCaseDependencies {
    userRepository: UserRepository;
}

class UpdateFullnameUseCase{
    private _userRepository: UserRepository;

    constructor({ userRepository }: UpdateFullnameUseCaseDependencies) {
        this._userRepository = userRepository;
    }

    async execute(useCasePayload: { fullname: string }, useCaseParams: { id: string }) :Promise<IUser> {
        const { id } = useCaseParams;

        const updateFullname = new UpdateFullname(useCasePayload);

        const user = await this._userRepository.updateFullnameById(id, updateFullname.fullname);

        return user;
    }
}

export default UpdateFullnameUseCase;
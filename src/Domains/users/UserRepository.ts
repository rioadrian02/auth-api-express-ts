export interface IUser {
    id: string,
    username: string,
    fullname: string
}

export interface IRegisteredUser {
    id: string,
    username: string,
    fullname: string
}

export interface IRegisterUser {
    username: string,
    password: string,
    fullname: string,
}

abstract class UserRepository{
    async addUser(user: IRegisterUser): Promise<IRegisteredUser> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async verifyAvailableUsername(username: string): Promise<void> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getPasswordByUsername(username: string): Promise<string> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getIdByUsername(username: string): Promise<string> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getUserById(id:string): Promise<IUser> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async updateFullnameById(id: string, username: string): Promise<IUser> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteUser(id: string): Promise<void> {
        throw new Error('DOMAIN.USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    
}

export default UserRepository;
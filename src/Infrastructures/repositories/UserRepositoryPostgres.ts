import { nanoid } from "nanoid";
import pkg, { PoolClient } from 'pg';
const { Pool } = pkg;
import UserRepository, {IRegisteredUser, IRegisterUser, IUser} from "../../Domains/users/UserRepository.js";
import RegisteredUser from "../../Domains/users/RegisteredUser.js";
import InvariantError from "../../Commons/exceptions/InvariantError.js";
import NotFoundError from "../../Commons/exceptions/NotFoundError.js";

class UserRepositoryPostgres extends UserRepository {
    private _pool: InstanceType<typeof Pool>

    constructor() {
        super();
        this._pool = new Pool();
    }

    async verifyAvailableUsername(username: string): Promise<void> {
        const query = {
            text: 'SELECT id FROM users WHERE username = $1',
            values: [username]
        }

        const result = await this._pool.query(query);

        if(result.rows.length > 0) {
            throw new InvariantError('Username sudah digunakan');
        }
    }

    async addUser({username, password, fullname} : IRegisterUser): Promise<IRegisteredUser> {
        const id = `user-${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO users(id, username, password, fullname, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, fullname',
            values: [id, username, password, fullname, createdAt]
        }

        const result = await this._pool.query(query);

        return new RegisteredUser(result.rows[0]);
    }

    async getPasswordByUsername(username: string) :Promise<string> {
        const query = {
            text: 'SELECT password FROM users WHERE username=$1',
            values: [username]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Username tidak ditemukan');
        }

        return result.rows[0].password;
    }

    async getIdByUsername(username: string): Promise<string> {
        const query = {
            text: 'SELECT id FROM users WHERE username=$1',
            values: [username]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Username tidak ditemukan');
        }

        return result.rows[0].id;
    }

    async getUserById(id: string): Promise<IUser> {
        const query = {
            text: 'SELECT id, username, fullname FROM users WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows[0]) {
            throw new NotFoundError('Id tidak ditemukan');
        }

        return result.rows[0];
    }

    async updateFullnameById(id: string, fullname: string): Promise<IUser>{
        const query = {
            text: 'UPDATE users SET fullname = $1 WHERE id = $2 RETURNING id,username,fullname',
            values: [fullname, id]
        };

        const result = await this._pool.query(query);

        if(!result.rows[0]) {
            throw new NotFoundError('Id tidak ditemukan');
        }

        return result.rows[0];
    }

    async deleteUser(id: string, client?: PoolClient): Promise<void> {
        const db = client ?? this._pool;

        const query = {
            text: 'DELETE FROM users WHERE id=$1 RETURNING id',
            values: [id]
        }

        const result = await db.query(query);

        if(!result.rows[0]) {
            throw new NotFoundError('User tidak ditemukan');
        }
    }
}

export default UserRepositoryPostgres;


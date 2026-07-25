import pkg, { PoolClient } from 'pg';
const  { Pool } = pkg;
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
    private _pool: InstanceType<typeof Pool>

    constructor() {
        super();
        this._pool = new Pool();
    }

    async addToken(token: string, userId: string): Promise<void> {
        const query = {
            text: 'INSERT INTO authentications(token, user_id) VALUES($1, $2)',
            values: [token, userId],
        };
        await this._pool.query(query);
    }

    async checkAvailabilityToken(token: string) : Promise<void> {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Refresh token tidak ditemukan di database');
        }
    }

    async deleteToken(token: string): Promise<void> {
        const query = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        };
        await this._pool.query(query);
    }

    async deleteAllTokenByUserId(userId: string, client?: PoolClient): Promise<void> {
        const db = client || this._pool;

        const query = {
            text: 'DELETE FROM authentications WHERE user_id = $1',
            values: [userId]
        }

        await db.query(query);
    }
}

export default AuthenticationRepositoryPostgres;
import pkg from 'pg';
const { Pool } = pkg;
import { PoolClient } from 'pg';

const pool = new Pool();

const withTransaction = async <T>( callback: (client: PoolClient) => Promise<T> ) :Promise<T> => {
    const client = await pool.connect();

    try {
        // BEGIN
        await client.query('BEGIN');

        const result = await callback(client);

        await client.query('COMMIT');

        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export default withTransaction;

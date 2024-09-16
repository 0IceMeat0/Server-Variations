import { pool } from './user-model.js';

const getUser = async (req, res) => {
    try {
        let user;
        if (req.params.id) {
            const result = await pool.query(
                'SELECT * FROM users WHERE id = $1',
                [req.params.id],
            );
            user = result.rows[0];
            if (user) {
                res.send(user);
            } else {
                res.send({ message: 'User not found' });
            }
        } else {
            const result = await pool.query('SELECT * FROM users');
            res.send(result.rows);
        }
    } catch (err) {
        res.send({ error: err.message });
    }
};

const createUser = async (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.send({ message: 'Invalid request, missing user data' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
            [name, age],
        );
        res.send(result.rows[0]);
    } catch (err) {
        res.send({ error: err.message });
    }
};

const changeUser = async (req, res) => {
    const { id, name, age } = req.body;

    if (!id) {
        return res.send({ message: 'Invalid request, missing user ID' });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *',
            [name, age, id],
        );
        if (result.rows.length > 0) {
            res.send(result.rows[0]);
        } else {
            res.send({ message: 'User not found' });
        }
    } catch (err) {
        res.send({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.send({ message: 'Invalid request, missing user ID' });
    }

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id],
        );
        if (result.rows.length > 0) {
            res.send({
                message: 'User deleted',
                user: result.rows[0],
            });
        } else {
            res.send({ message: 'User not found' });
        }
    } catch (err) {
        res.send({ error: err.message });
    }
};

export { getUser, createUser, changeUser, deleteUser };

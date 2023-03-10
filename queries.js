const { query } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodeapp',
    password: 'root',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    const {
        firstname,
        lastname,
        email,
        phone,
    } = request.body
    pool.query('INSERT INTO users (firstname, lastname,email,phone) VALUES ($1, $2, $3,$4)', [firstname, lastname,email,phone], (error, results) => {
        console.log(query)
        if (error) {
            throw error
        }
        response.status(200).send(`User added `)
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        firstname,
        lastname,
        email,
        phone
    } = request.body
    pool.query(
        'UPDATE users SET firstname = $1, lastname = $2, email = $3, phone = $4  WHERE id = $5',
        [firstname,lastname, email, phone, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
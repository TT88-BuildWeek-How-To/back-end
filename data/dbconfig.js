const knex = require('knex')
// const { development } = require('../knexfile')
 

const knexfile = require('../knexfile')
const environment = process.env.NODE_ENV || "development"

module.exports = knex({
    client: "pg",
    connection: {
        host : process.env.DB_HOST,
        user :process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        name : process.env.DB_NAME,
        port : process.env.DB_PORT,
        ssl: {
            rejectUnauthorized: false
        }
        
    },
    migrations: {
        directory: "./data/migrations",
    },
    seeds: {
        directory: "./data/seeds",
    },
    pool: {
        min: 2,
        max: 10
    },
})
    
    
    // knexfile[environment])

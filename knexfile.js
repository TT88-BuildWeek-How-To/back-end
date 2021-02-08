// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lifehacks.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  //add testing
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/lifehacks.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",

    },
    seeds: {
      directory: "./data/seeds",
    },

  },
  //add a production
  production: {
    client: "pg",
    connection: {
      host : process.env.DB_HOST,
      user :process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      name : process.env.DB_NAME,
      port : process.env.DB_PORT,
      ssl: {
          rejectUnauthorized: false
},        
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
},  
};

module.exports = {
    development: {
      url: 'postgres://postgres:admin@localhost:5432/bookmark',
      dialect: 'postgres'
  },
     production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    },
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    }
  },
    test: {
      url: process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/bookmark_test',
      dialect: 'postgres'
  },
  /*
 define: {
      freezeTableName: true,
      underscored: true
    }
    */
};
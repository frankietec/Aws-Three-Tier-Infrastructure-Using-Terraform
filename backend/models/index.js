
// models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')[env];

let sequelize;

// Initialize Sequelize based on the environment
if (config.use_env_variable && process.env[config.use_env_variable]) {
  // Production uses DATABASE_URL.
  // Remove sslmode because pg-connection-string can replace
  // the explicitly configured AWS CA certificate when parsing it.
  const databaseUrl = new URL(process.env[config.use_env_variable]);
  databaseUrl.searchParams.delete('sslmode');

  sequelize = new Sequelize(databaseUrl.toString(), config);
} else {
  // Local development and test environments use separate parameters.
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    dialectOptions: config.dialectOptions,
  });
}

const db = {};

// Expose Sequelize and its instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Notification = require('./notification')(sequelize, DataTypes);
db.Project = require('./project')(sequelize, DataTypes);

// Establish model associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

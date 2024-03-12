import {Sequelize} from 'sequelize';

import {DATABASE_URL} from '@/settings';
import Token from './token.model';
import User from './user.model';

const db = {};
const modelGenerators = [Token, User];
const sequelize = new Sequelize(DATABASE_URL);

modelGenerators.forEach((generator) => {
  const model = generator(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

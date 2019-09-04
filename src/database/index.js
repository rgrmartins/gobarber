import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // Conexão com o Banco Relacional através do Sequelize
  init() {
    this.connection = new Sequelize(databaseConfig);

    // Segundo Map é para rodar os associates de cada model caso tenha
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // Conexão com o banco Não Relacional através do Mongoose
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();

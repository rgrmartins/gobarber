import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // uma funcionalidade do próprio sequelize
    // beforeSave será executado antes de salvar algo no banco
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // Associando o File com o User
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // checando se a senha enviada bate com a criptografada no banco
  // por não ser uma regra de negócio não tem problema ficar aqui no model
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

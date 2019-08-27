import Sequelize, { Model } from 'sequelize';

class Appointments extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // static associate(models) {

  // }
}
export default Appointments;

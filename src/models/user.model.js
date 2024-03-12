import {compare, genSalt, hash} from 'bcryptjs';
import {Model} from 'sequelize';

/**
 * User model generator.
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @return {Model} - User model
 */
export default (sequelize, DataTypes) => {
  /**
   * User model class.
   */
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Models} models - Sequelize models
     */
    static associate(models) {
      this.hasOne(models.Token, {foreignKey: 'userId'});
    }

    /**
     * Checks the password for the user.
     * @param {string} password - password to check
     * @return {boolean} - match
     */
    async checkPassword(password) {
      return await compare(password, this.password);
    }

    /**
     * JSON representation of the user.
     * @return {Object | Array<Object>} - JSON representation
     */
    toJSON() {
      return {...this.get(), password: undefined};
    }
  }
  User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        email: {type: DataTypes.STRING, unique: true},
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        isActive: {type: DataTypes.BOOLEAN, defaultValue: true},
        isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
        dateJoined: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        lastLogin: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        hooks: {
          beforeSave: async (user) => {
            if (user.changed('password')) {
              const salt = await genSalt(12);
              const hashedPassword = await hash(user.password, salt);
              user.password = hashedPassword;
            }
          },
        },
        timestamps: false,
      },
  );
  return User;
};

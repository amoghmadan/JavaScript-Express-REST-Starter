import {Model} from 'sequelize';

/**
 * Token model generator.
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @return {Model} - Token model
 */
export default (sequelize, DataTypes) => {
  /**
   * Token model class.
   */
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Models} models - Sequelize models
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }

    /**
     * JSON representation of the token.
     * @return {Object | Array<Object>} - JSON representation
     */
    toJSON() {
      const data = this.get();
      return {token: data.key};
    }
  }
  Token.init(
      {
        key: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          primaryKey: true,
        },
        created: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
      },
      {
        sequelize,
        modelName: 'Token',
        tableName: 'tokens',
        timestamps: false,
      },
  );
  return Token;
};

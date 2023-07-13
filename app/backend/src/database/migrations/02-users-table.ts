import { DataTypes, Model, QueryInterface } from "sequelize";
import IUser from "../../Interfaces/IUser";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface
    .createTable<Model<IUser>>(
      'users',
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }
    ),
  down: async (queryInterface: QueryInterface) => {},
}

import { DataTypes, Model, QueryInterface } from "sequelize";
import ITeam from "../../Interfaces/ITeam";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<ITeam>>(
    'teams',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name'
      }
    }
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('teams')
}

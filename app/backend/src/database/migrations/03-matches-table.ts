import { DataTypes, Model } from "sequelize";
import { QueryInterface } from "sequelize";
import IMatch from '../../Interfaces/IMatch';

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<IMatch>>(
    'matches',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_id',
        references: {
          key: 'id',
          model: 'teams',
        }
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_id',
        references: {
          key: 'id',
          model: 'teams',
        }
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      }
    },
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('matches'),
}

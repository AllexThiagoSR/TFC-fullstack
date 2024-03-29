import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<
InferAttributes<SequelizeMatch>, InferCreationAttributes<SequelizeMatch>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'homeTeamId', as: 'matchesHome' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'awayTeamId', as: 'matchesAway' });

export default SequelizeMatch;

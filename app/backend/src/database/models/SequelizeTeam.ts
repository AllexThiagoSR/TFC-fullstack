import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';

class SequelizeTeam extends
  Model<InferAttributes<SequelizeTeam>, InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: DataTypes.STRING,
  },
  {
    tableName: 'teams',
    underscored: true,
    timestamps: false,
    sequelize: db,
  },
);

export default SequelizeTeam;

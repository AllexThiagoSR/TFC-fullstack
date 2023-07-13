import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeUser extends
  Model<InferAttributes<SequelizeUser>, InferCreationAttributes<SequelizeUser>> {
  declare id: CreationOptional<number>;
  declare role: string;
  declare email: string;
  declare password: string;
  declare username: string;
}

SequelizeUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    underscored: true,
    timestamps: false,
  },
);

export default SequelizeUser;

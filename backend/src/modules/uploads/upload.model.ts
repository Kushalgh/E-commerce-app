import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class FileUpload extends Model {
  public id!: number;
  public filename!: string;
  public filepath!: string;
}

FileUpload.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'files',
  },
);

export default FileUpload;

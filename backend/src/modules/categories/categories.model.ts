import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface CategoryAttributes {
  id: number;
  category_name: string;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

const Category = sequelize.define<Model<CategoryAttributes, CategoryCreationAttributes>>(
  'Categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Category;

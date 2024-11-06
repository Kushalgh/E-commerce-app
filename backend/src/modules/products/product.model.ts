// models/products/product.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import FileUpload from '../uploads/upload.model';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_id: number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes {}

const Product = sequelize.define<ProductInstance>('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FileUpload,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
});

Product.belongsTo(FileUpload, { foreignKey: 'image_id', as: 'image' });
FileUpload.hasMany(Product, { foreignKey: 'image_id' });

export default Product;

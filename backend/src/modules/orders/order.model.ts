import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "../users/user.model";
import Product from "../products/product.model";

// Order model
export interface OrderAttributes {
  id: number;
  userId: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  OrderItems?: OrderItemAttributes[];
}

export interface OrderCreationAttributes
  extends Optional<OrderAttributes, "id" | "status" | "OrderItems"> {}

export interface OrderInstance
  extends Model<OrderAttributes, OrderCreationAttributes>,
    OrderAttributes {
  getOrderItems: () => Promise<OrderItemInstance[]>;
}

const Order = sequelize.define<OrderInstance>("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    defaultValue: "pending",
  },
});

// OrderItem model
export interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}

export interface OrderItemInstance
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>,
    OrderItemAttributes {}

const OrderItem = sequelize.define<OrderItemInstance>("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Associations
Order.belongsTo(User);
User.hasMany(Order);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

export { Order, OrderItem };

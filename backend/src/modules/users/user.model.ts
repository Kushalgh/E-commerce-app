import { DataTypes, Optional, Model } from "sequelize";
import sequelize from "../../config/database"; // Adjust the import path as needed
import bcrypt from "bcryptjs";

// Define the allowed role values
export type RoleType = "user" | "admin";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export interface UserModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    modelName: "User",
    timestamps: true,
  },
);

// Hook to hash password before creating a new user
User.beforeCreate(async (user: UserModel) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;

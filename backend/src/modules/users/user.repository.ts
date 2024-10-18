import UserModel, { UserAttributes } from "./user.model";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

export const createUser = async (
  userData: CreateUserDto,
): Promise<UserAttributes> => {
  try {
    return await UserModel.create(userData);
  } catch (error: any) {
    if (error?.errors) {
      error?.errors.forEach((err: any) => {});
    }
    throw error;
  }
};
export const findUserById = async (
  id: number,
): Promise<UserAttributes | null> => {
  return await UserModel.findByPk(id);
};

export const findUserByEmail = async (
  email: string,
): Promise<UserAttributes | null> => {
  return await UserModel.findOne({ where: { email } });
};

export const updateUser = async (
  id: number,
  userData: UpdateUserDto,
): Promise<[number, UserAttributes[]]> => {
  return await UserModel.update(userData, { where: { id }, returning: true });
};

export const deleteUser = async (id: number): Promise<number> => {
  return await UserModel.destroy({ where: { id } });
};

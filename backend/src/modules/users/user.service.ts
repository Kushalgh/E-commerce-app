import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepository from './user.repository';
import { CreateUserDto, UpdateUserDto, UserResponseDto, LoginDto, UserDto } from './user.dto';
import { MESSAGES } from '../../utils/constants';
import User from './user.model';

export const register = async (userData: CreateUserDto): Promise<UserResponseDto> => {
  const user = await createUser(userData);
  return toUserResponseDto(user);
};

export const login = async (loginData: LoginDto): Promise<{ user: UserResponseDto; token: string }> => {
  const { email, password } = loginData;
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error(MESSAGES.INVALID_CREDENTIALS);
  }
  const token = generateToken(user);
  return { user: toUserResponseDto(user), token };
};

export const getUser = async (id: number): Promise<UserResponseDto> => {
  const user = await getUserById(id);

  if (!user) {
    throw new Error(MESSAGES.USER_NOT_FOUND);
  }
  return toUserResponseDto(user);
};

export const updateUser = async (id: number, userData: UpdateUserDto): Promise<UserResponseDto> => {
  const updatedUser = await updateUserById(id, userData);
  if (!updatedUser) {
    throw new Error(MESSAGES.USER_NOT_FOUND);
  }
  return toUserResponseDto(updatedUser);
};

export const deleteUser = async (id: number): Promise<void> => {
  const result = await deleteUserById(id);
  if (!result) {
    throw new Error(MESSAGES.USER_NOT_FOUND);
  }
};

const createUser = async (userData: CreateUserDto): Promise<UserDto> => {
  const user = await userRepository.createUser(userData);
  return user;
};

const getUserById = async (id: number): Promise<UserDto | null> => {
  const user = await userRepository.findUserById(id);
  return user;
};

export const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const updateUserById = async (id: number, userData: UpdateUserDto): Promise<UserDto | null> => {
  const [, [updatedUser]] = await userRepository.updateUser(id, userData);
  return updatedUser || null;
};

const deleteUserById = async (id: number): Promise<boolean> => {
  const deletedCount = await userRepository.deleteUser(id);
  return deletedCount > 0;
};

const generateToken = (user: UserDto): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error(MESSAGES.JWT_SECRET_NOT_DEFINED);
  }
  return jwt.sign({ id: user?.id, role: user?.role }, jwtSecret, {
    expiresIn: '1d',
  });
};

const toUserResponseDto = (user: UserDto): UserResponseDto => {
  const { id, name, email, role } = user;

  return { id, name, email, role };
};

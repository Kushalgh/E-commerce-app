import { RoleType } from "./user.model";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: RoleType;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  role: RoleType;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleType;
}

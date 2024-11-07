import { FindOptions } from 'sequelize';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export const getPaginationOptions = (options: PaginationOptions): { limit: number; offset: number } => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const offset = (page - 1) * limit;

  return { limit, offset };
};

export const paginateResults = <T>(data: T[], totalItems: number, page: number, limit: number): PaginatedResult<T> => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    totalItems,
    currentPage: page,
    totalPages,
  };
};

export const withPagination = (options: PaginationOptions): Pick<FindOptions, 'limit' | 'offset'> => {
  return getPaginationOptions(options);
};

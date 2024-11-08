import * as productService from './product.service';
import { successResponse, errorResponse, paginationSuccessResponse } from '../../utils/response';
import { MESSAGES } from '../../utils/constants';
import { Response, NextFunction, Request } from 'express';

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { product, errors } = await productService.createProduct(req.body);

    if (errors) {
      return errorResponse(res, 422, MESSAGES.VALIDATION_FAILED, errors);
    }

    successResponse(res, MESSAGES.PRODUCT_CREATED_SUCCESS, product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = parseInt(req.params.id);
    const { product, errors } = await productService.updateProduct(productId, req.body);

    if (errors) {
      return errorResponse(res, 400, MESSAGES.VALIDATION_FAILED, errors);
    }

    if (product) {
      successResponse(res, MESSAGES.PRODUCT_UPDATED_SUCCESS, product);
    } else {
      errorResponse(res, 404, MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const paginatedProducts = await productService.getAllProducts({
      page,
      limit,

      params: {
        category_id: req.query.category_id as string,
      },
    });
    paginationSuccessResponse(
      res,
      paginatedProducts.data,
      paginatedProducts.totalItems,
      paginatedProducts.currentPage,
      paginatedProducts.totalPages,
      MESSAGES.PRODUCT_FETCH_SUCCESS,
    );
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productService.getProductById(productId);

    if (product) {
      successResponse(res, MESSAGES.PRODUCT_FETCH_SUCCESS, product);
    } else {
      errorResponse(res, 404, MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = parseInt(req.params.id);
    const deleted = await productService.deleteProduct(productId);

    if (deleted) {
      successResponse(res, MESSAGES.PRODUCT_DELETED_SUCCESS);
    } else {
      errorResponse(res, 404, MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

export const saveProductWithImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
  } catch (error) {}
};

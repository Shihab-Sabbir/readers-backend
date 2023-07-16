import httpStatus from 'http-status';
import { ProductService } from './product.service';
import { RequestHandler } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { productFilterFields, productSearchFields } from './product.constant';
import { IProduct } from './product.interface';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';
import { JwtPayload } from 'jsonwebtoken';

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const productInfo = req.body;
    const requestedUser: JwtPayload | null = req.user;
    const result = await ProductService.createProduct(
      productInfo,
      requestedUser as JwtPayload
    );
    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const searchFilterAndPaginationOptions = getSearchAndPaginationOptions(
      req.query,
      productFilterFields,
      productSearchFields
    );

    const result = await ProductService.getProducts(
      searchFilterAndPaginationOptions
    );

    sendResponse<IProduct[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      data: result.data,
      message: 'Products fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await ProductService.getSingleProduct(id);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const handleReview: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const userInfo: JwtPayload | null = req.user;
    const review = req.body.review;
    const result = await ProductService.handleReview(
      id,
      userInfo as JwtPayload,
      review
    );

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};
const handleWishList: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const userInfo: JwtPayload | null = req.user;
    const result = await ProductService.handleWishList(
      id,
      userInfo as JwtPayload
    );

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const handleReadList: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const userInfo: JwtPayload | null = req.user;
    const result = await ProductService.handleReadList(
      id,
      userInfo as JwtPayload
    );

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const handleReadStatus: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const userInfo: JwtPayload | null = req.user;
    const status = req.body.status
    const result = await ProductService.handleReadStatus(
      id,
      userInfo as JwtPayload,
      status as 'reading' | 'read soon' | 'finished'
    );

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IProduct> = req.body;
    const result = await ProductService.updateProduct(id, updatedData);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await ProductService.deleteProduct(id);

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Product deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  handleWishList,
  handleReadList,
  handleReadStatus,
  handleReview
};

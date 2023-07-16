import { IProduct, IReading } from './product.interface';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';
import Product from './product.model';
import { JwtPayload } from 'jsonwebtoken';

const createProduct = async (
  productInfo: IProduct,
  requestedUser: JwtPayload
): Promise<IProduct | null> => {
  const { phoneNumber } = requestedUser;
  const createdProduct = await Product.create({
    ...productInfo,
    addedBy: phoneNumber,
  });
  return createdProduct;
};

const getProducts = async (
  searchFilterAndPaginationOptions: any
): Promise<IGenericPaginationResponse<IProduct[] | []>> => {
  const { searchAndFilter, page, limit, skip, sort } =
    searchFilterAndPaginationOptions;
  const product: IProduct[] | [] = await Product.find(searchAndFilter)
    .skip(skip)
    .sort(sort)
    .limit(limit as number);

  const total = await Product.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IProduct[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: product,
  };

  return result;
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findById(id);
  return product;
};

const updateProduct = async (
  id: string,
  updatedData: Partial<IProduct>
): Promise<IProduct | null> => {
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedProduct;
};

const handleWishList = async (
  id: string,
  userInfo: JwtPayload
): Promise<IProduct | null> => {
  const { phoneNumber } = userInfo;

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (product) {
      // Check if phoneNumber is already in the wishedBy array
      const index = product.wishedBy?.indexOf(phoneNumber);

      if (index !== undefined && index !== -1) {
        // If phoneNumber exists, remove it from the array
        product.wishedBy?.splice(index, 1);
      } else {
        // If phoneNumber doesn't exist, add it to the array
        product.wishedBy?.push(phoneNumber);
      }

      // Save the updated product
      const updatedProduct = await product.save();

      return updatedProduct;
    } else {
      return null; // Product not found
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error handling wish list:', error);
    throw error;
  }
};

const handleReadList = async (
  id: string,
  userInfo: JwtPayload
): Promise<IProduct | null> => {
  const { phoneNumber } = userInfo;

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (product) {
      // Check if phoneNumber is already in the readList array
      const index = product.readList?.findIndex(
        (reading: IReading) => reading.phoneNumber === phoneNumber
      );

      if (index !== undefined && index !== -1) {
        // If phoneNumber exists, remove it from the array
        product.readList?.splice(index, 1);
      } else {
        // If phoneNumber doesn't exist, add it to the array with status 'reading'
        const newReading: IReading = {
          phoneNumber,
        };
        product.readList?.push(newReading);
      }

      // Save the updated product
      const updatedProduct = await product.save();

      return updatedProduct;
    } else {
      return null; // Product not found
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error handling read list:', error);
    throw error;
  }
};

const handleReadStatus = async (
  id: string,
  userInfo: JwtPayload,
  status: 'reading' | 'read soon' | 'finished'
): Promise<IProduct | null> => {
  const { phoneNumber } = userInfo;

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (product) {
      // Find the reading object with the matching phoneNumber
      const readingIndex = product.readList?.findIndex(
        (reading: IReading) => reading.phoneNumber === phoneNumber
      );

      if (readingIndex !== undefined && readingIndex !== -1) {
        // If the reading object is found, update its status
        product.readList![readingIndex].status = status;
      }

      // Save the updated product
      const updatedProduct = await product.save();

      return updatedProduct;
    } else {
      return null; // Product not found
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error handling read status:', error);
    throw error;
  }
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const deletedProduct = await Product.findByIdAndDelete({
    _id: id,
  });
  return deletedProduct;
};

export const ProductService = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  handleWishList,
  handleReadList,
  handleReadStatus,
};

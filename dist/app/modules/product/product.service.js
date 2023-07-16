"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const createProduct = async (productInfo, requestedUser) => {
    const { phoneNumber } = requestedUser;
    const { publicationDate } = productInfo;
    const publicationYear = publicationDate.slice(6);
    const createdProduct = await product_model_1.default.create(Object.assign(Object.assign({}, productInfo), { addedBy: phoneNumber, publicationYear }));
    return createdProduct;
};
const getProducts = async (searchFilterAndPaginationOptions) => {
    const { searchAndFilter, page, limit, skip, sort } = searchFilterAndPaginationOptions;
    const product = await product_model_1.default.find(searchAndFilter)
        .skip(skip)
        .sort(sort)
        .limit(limit);
    const total = await product_model_1.default.countDocuments(searchAndFilter);
    const result = {
        meta: {
            page,
            limit,
            total,
        },
        data: product,
    };
    return result;
};
const getSingleProduct = async (id) => {
    const product = await product_model_1.default.findById(id);
    return product;
};
const updateProduct = async (id, updatedData) => {
    const updatedProduct = await product_model_1.default.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
        runValidators: true,
    });
    return updatedProduct;
};
const handleWishList = async (id, userInfo) => {
    var _a, _b, _c;
    const { phoneNumber } = userInfo;
    try {
        // Find the product by ID
        const product = await product_model_1.default.findById(id);
        if (product && phoneNumber) {
            // Check if phoneNumber is already in the wishedBy array
            const index = (_a = product.wishedBy) === null || _a === void 0 ? void 0 : _a.indexOf(phoneNumber);
            if (index !== undefined && index !== -1) {
                // If phoneNumber exists, remove it from the array
                (_b = product.wishedBy) === null || _b === void 0 ? void 0 : _b.splice(index, 1);
            }
            else {
                // If phoneNumber doesn't exist, add it to the array
                (_c = product.wishedBy) === null || _c === void 0 ? void 0 : _c.push(phoneNumber);
            }
            // Save the updated product
            const updatedProduct = await product.save();
            return updatedProduct;
        }
        else {
            return null; // Product not found
        }
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error handling wish list:', error);
        throw error;
    }
};
const handleReview = async (id, userInfo, review) => {
    var _a;
    const { phoneNumber } = userInfo;
    try {
        // Find the product by ID
        const product = await product_model_1.default.findById(id);
        const user = await user_model_1.default.findOne({ phoneNumber }).lean();
        console.log({ user });
        if (product && user) {
            const firstName = user.name.firstName;
            const lastName = user.name.lastName;
            const name = firstName + ' ' + lastName;
            (_a = product.review) === null || _a === void 0 ? void 0 : _a.push(Object.assign(Object.assign({}, review), { name }));
            const updatedProduct = await product.save();
            return updatedProduct;
        }
        else {
            return null;
        }
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error handling wish list:', error);
        throw error;
    }
};
const handleReadList = async (id, userInfo) => {
    var _a, _b, _c;
    const { phoneNumber } = userInfo;
    try {
        // Find the product by ID
        const product = await product_model_1.default.findById(id);
        if (product && phoneNumber) {
            // Check if phoneNumber is already in the readList array
            const index = (_a = product.readList) === null || _a === void 0 ? void 0 : _a.findIndex((reading) => reading.phoneNumber === phoneNumber);
            if (index !== undefined && index !== -1) {
                // If phoneNumber exists, remove it from the array
                (_b = product.readList) === null || _b === void 0 ? void 0 : _b.splice(index, 1);
            }
            else {
                // If phoneNumber doesn't exist, add it to the array with status 'reading'
                const newReading = {
                    phoneNumber,
                };
                (_c = product.readList) === null || _c === void 0 ? void 0 : _c.push(newReading);
            }
            // Save the updated product
            const updatedProduct = await product.save();
            return updatedProduct;
        }
        else {
            return null; // Product not found
        }
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error handling read list:', error);
        throw error;
    }
};
const handleReadStatus = async (id, userInfo, status) => {
    var _a;
    const { phoneNumber } = userInfo;
    try {
        // Find the product by ID
        const product = await product_model_1.default.findById(id);
        if (product) {
            // Find the reading object with the matching phoneNumber
            const readingIndex = (_a = product.readList) === null || _a === void 0 ? void 0 : _a.findIndex((reading) => reading.phoneNumber === phoneNumber);
            if (readingIndex !== undefined && readingIndex !== -1) {
                // If the reading object is found, update its status
                product.readList[readingIndex].status = status;
            }
            // Save the updated product
            const updatedProduct = await product.save();
            return updatedProduct;
        }
        else {
            return null; // Product not found
        }
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error handling read status:', error);
        throw error;
    }
};
const deleteProduct = async (id) => {
    const deletedProduct = await product_model_1.default.findByIdAndDelete({
        _id: id,
    });
    return deletedProduct;
};
exports.ProductService = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    handleWishList,
    handleReadList,
    handleReadStatus,
    handleReview,
};

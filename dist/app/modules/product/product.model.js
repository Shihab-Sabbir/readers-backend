"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://i.ibb.co/kGBTcsd/Free-Book-Cover-Mockup-PSD-For-Branding-2.jpg',
    },
    addedBy: {
        type: String,
    },
    wishedBy: {
        type: [String],
        default: null,
    },
    readList: {
        type: [
            {
                phoneNumber: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    enum: ['reading', 'read soon', 'finished'],
                },
            },
        ],
        default: null,
    },
    review: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                date: {
                    type: String,
                    required: true,
                },
                body: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: null,
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;

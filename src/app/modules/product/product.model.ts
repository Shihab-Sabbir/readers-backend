import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
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
    image: {
      type: String,
      default:
        'https://th.bing.com/th/id/OIP.P7U2Y-CRzXANY1pqs6ZyeQAAAA?pid=ImgDet&rs=1',
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
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>('Product', productSchema);

export default Product;

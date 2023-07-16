import { IProductFilters, IProductSearch } from './product.interface';

export const productSearchFields: (keyof IProductSearch)[] = [
  'genre',
  'author',
  'title',
];

export const productFilterFields: (keyof IProductFilters)[] = [
  'genre',
  'publicationYear',
];

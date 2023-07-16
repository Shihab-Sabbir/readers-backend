import { IProductFilters, IProductSearch } from './product.interface';

export const productSearchFields: (keyof IProductSearch)[] = [
  'genre',
  'publicationDate',
];

export const productFilterFields: (keyof IProductFilters)[] = [
  'minPrice',
  'maxPrice',
];

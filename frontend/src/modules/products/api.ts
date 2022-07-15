import fetcher from '../../config/fetcher';
import { ProductCreateValue, Product, ProductUpdateValue } from './types';

export const fetchProducts = async ({ search }: { search: string }) => {
  const { data } = await fetcher.get('/products', { params: { search } });
  return data;
};

export const fetchProduct = async (id: string) => {
  const { data } = await fetcher.get(`/products/${id}`);
  return data;
};

export const createProduct = async (values: ProductCreateValue) => {
  const { data } = await fetcher.post('/products', values);
  return data;
};

export const updateProduct = async (
  id: Product['id'],
  values: ProductUpdateValue
) => {
  const { data } = await fetcher.put(`/products/${id}`, values);
  return data;
};

export const deleteProduct = async (id: Product['id']) => {
  const { data } = await fetcher.delete(`/products/${id}`);
  return data;
};

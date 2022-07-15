import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from './api';
import { Product, ProductCreateValue, ProductUpdateValue } from './types';

// Query Key Factories
// const productKeys = {
//   all: ['todos'] as const,
//   lists: () => [...productKeys.all, 'lists'] as const,
//   detail: (id: string) => [...productKeys.all, id] as const,
//   ...
// }

export const useProducts = (search: string) => {
  return useQuery<Product[], Error>(
    ['products', search],
    () => fetchProducts({ search }),
    { keepPreviousData: true }
  );
};

export const useProduct = (id: string) => {
  return useQuery<Product, Error>(['product', id], () => fetchProduct(id), {
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation<AxiosResponse<Product>, Error, ProductCreateValue>(
    (values) => createProduct(values),
    {
      onSuccess: () => {
        qc.invalidateQueries(['products']);
      },
    }
  );
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation<
    AxiosResponse<Product>,
    Error,
    { id: Product['id']; values: ProductUpdateValue }
  >(({ id, values }) => updateProduct(id, values), {
    onSuccess: (data, { id, values }) => {
      qc.setQueryData(['product', id], { ...data, ...values });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation<AxiosResponse<Product>, Error, Product['id']>(
    (id) => deleteProduct(id),
    {
      onSuccess: () => {
        qc.invalidateQueries(['products']);
      },
    }
  );
};

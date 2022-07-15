import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetcher from '../../config/fetcher';

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  description?: string;
  price: number;
  sku: string;
  published: boolean;
}

export type ProductCreateValue = Pick<
  Product,
  'name' | 'description' | 'price' | 'sku' | 'published'
>;

export type ProductUpdateValue = Partial<ProductCreateValue>;

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
    async () => {
      const { data } = await fetcher.get('/products', { params: { search } });
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useProduct = (id: string) => {
  return useQuery<Product, Error>(
    ['product', id],
    async () => {
      const { data } = await fetcher.get(`/products/${id}`);
      return data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation<AxiosResponse<Product>, Error, ProductCreateValue>(
    (values) => fetcher.post('/products', values),
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
    Pick<Product, 'id'> & { values: ProductUpdateValue }
  >(({ id, values }) => fetcher.put(`/products/${id}`, values), {
    onSuccess: (data, { id, values }) => {
      qc.setQueryData(['product', id], { ...data, ...values });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation<AxiosResponse<Product>, Error, Product['id']>(
    (id) => fetcher.delete(`/products/${id}`),
    {
      onSuccess: () => {
        qc.invalidateQueries(['products']);
      },
    }
  );
};

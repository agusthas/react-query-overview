import { useQuery } from 'react-query';
import fetcher from '../../config/fetcher';

interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  description?: string;
  price: number;
  sku: string;
  published: boolean;
}

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

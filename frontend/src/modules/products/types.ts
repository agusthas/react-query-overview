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

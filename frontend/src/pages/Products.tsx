import {
  Alert,
  Badge,
  Button,
  Group,
  Highlight,
  Indicator,
  List,
  Loader,
  Modal,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useBooleanToggle, useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { ProductForm } from '../components/ProductForm';
import { ProductView } from '../components/ProductView';
import { useProduct, useProducts } from '../modules/products/hooks';
import { SetState } from '../types';

const Products: React.FC<{ setProductId: SetState<string> }> = ({
  setProductId,
}) => {
  const qc = useQueryClient();
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [debounced, cancel] = useDebouncedValue(search, 500);
  const products = useProducts(debounced);

  return (
    <div>
      <Group align="flex-end">
        <TextInput
          placeholder="Search"
          description="Search products by name, sku, or description"
          value={search}
          style={{ flex: 1 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={cancel}>Cancel</Button>
      </Group>

      <Group>
        <Button
          mt="lg"
          mb="md"
          variant="outline"
          onClick={() => setCreateModal(true)}
        >
          Add Product
        </Button>
      </Group>

      <Modal
        size="lg"
        opened={createModal}
        centered
        title="Add Product"
        onClose={() => setCreateModal(false)}
      >
        <ProductForm />
      </Modal>

      {products.data ? (
        <Stack>
          {products.data.map((product) => (
            <Paper
              key={product.id}
              withBorder
              p="sm"
              onClick={() => setProductId(product.id)}
              sx={(theme) => ({
                cursor: 'pointer',
                ':hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                },
              })}
            >
              <Stack>
                <div>
                  <Group position="apart">
                    <Text weight={500} size="lg" color="blue">
                      <Highlight highlight={debounced}>
                        {product.name}
                      </Highlight>
                    </Text>
                    {qc.getQueryData(['product', product.id]) ? (
                      <Badge variant="dot" color="teal">
                        Seen
                      </Badge>
                    ) : null}
                  </Group>
                  <Text color="dimmed" size="sm">
                    <Highlight highlight={debounced}>{product.sku}</Highlight>
                  </Text>
                </div>

                <div>
                  <List size="sm">
                    <List.Item>Price: ${product.price}</List.Item>
                    <List.Item>
                      CreatedAt: {new Date(product.createdAt).toLocaleString()}
                    </List.Item>
                    <List.Item>
                      UpdatedAt: {new Date(product.updatedAt).toLocaleString()}
                    </List.Item>
                  </List>
                </div>

                {product.description && (
                  <Text>
                    <Highlight highlight={debounced}>
                      {product.description}
                    </Highlight>
                  </Text>
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : products.error ? (
        <Alert title="Bummer!" color="red">
          {products.error.message}
        </Alert>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const Product: React.FC<{
  productId: string;
  setProductId: SetState<string>;
}> = ({ productId, setProductId }) => {
  const { data, isFetching, error } = useProduct(productId);

  return (
    <div>
      <Button onClick={() => setProductId('')} variant="subtle" mb="md">
        Back
      </Button>

      {data ? (
        <ProductView product={data} handleGoBack={() => setProductId('')} />
      ) : error ? (
        <Alert title="Bummer!" color="red">
          {error.message}
        </Alert>
      ) : (
        <Group position="center">
          <Loader variant="bars" />
        </Group>
      )}
    </div>
  );
};

function ProductPage() {
  const [productId, setProductId] = useState('');

  return (
    <div>
      <Title order={2} mb="md">
        Product Page
      </Title>

      {productId ? (
        <Product productId={productId} setProductId={setProductId} />
      ) : (
        <Products setProductId={setProductId} />
      )}
    </div>
  );
}

export default ProductPage;

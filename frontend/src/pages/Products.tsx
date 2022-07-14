import {
  Alert,
  Button,
  Group,
  Highlight,
  List,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';
import { useProducts } from '../modules/products/hooks';

function ProductPage() {
  const [search, setSearch] = useState('');
  const [debounced, cancel] = useDebouncedValue(search, 500);
  const products = useProducts(debounced);
  return (
    <div>
      <Title order={2} mb="md">
        Product Page
      </Title>

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

      {products.data ? (
        <Stack mt="lg">
          {products.data.map((product) => (
            <Paper withBorder p="sm">
              <Stack>
                <div>
                  <Text weight={500} size="lg" color="blue">
                    <Highlight highlight={debounced}>{product.name}</Highlight>
                  </Text>
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
}

export default ProductPage;

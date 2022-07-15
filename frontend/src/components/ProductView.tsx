import {
  Alert,
  Button,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useBooleanToggle } from '@mantine/hooks';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Product,
  ProductUpdateValue,
  useDeleteProduct,
  useUpdateProduct,
} from '../modules/products/hooks';
import { getSKUfromName } from '../utils';

export const ProductView: React.FC<{
  product: Product;
  handleGoBack: () => void;
}> = ({ product, handleGoBack }) => {
  const [isEdit, setIsEdit] = useState(false);
  const deleteMutation = useDeleteProduct();
  const updateMutation = useUpdateProduct();

  const form = useForm<ProductUpdateValue>({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      sku: product.sku,
      published: product.published,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    updateMutation.mutate(
      { id: product.id, values },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        handleGoBack();
      },
    });
  };

  return (
    <Paper withBorder p="md" style={{ position: 'relative' }}>
      {deleteMutation.isError && (
        <Alert color="red" title="Delete Failed!">
          {deleteMutation.error.message}
        </Alert>
      )}
      {updateMutation.isError && (
        <Alert color="red" title="Update Failed!">
          {updateMutation.error.message}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Product ID" disabled value={product.id} />
          <SimpleGrid cols={2}>
            <TextInput
              label="Product Name"
              disabled={!isEdit}
              value={form.values.name}
              onChange={(e) => {
                form.setFieldValue('name', e.target.value);
                form.setFieldValue('sku', getSKUfromName(e.target.value));
              }}
            />
            <TextInput
              label="SKU"
              disabled
              style={{ alignSelf: 'flex-end' }}
              {...form.getInputProps('sku')}
            />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <NumberInput
              label="Price"
              decimalSeparator="."
              precision={2}
              disabled={!isEdit}
              step={0.05}
              {...form.getInputProps('price')}
            />
            <Switch
              label="Published"
              disabled={!isEdit}
              style={{ alignSelf: 'flex-end' }}
              {...form.getInputProps('published', { type: 'checkbox' })}
            />
          </SimpleGrid>
          <Textarea
            label="Description"
            autosize
            disabled={!isEdit}
            minRows={2}
            {...form.getInputProps('description')}
          />
        </Stack>
        <Group mt={30} position="right">
          {isEdit && (
            <Button type="submit" color="green" variant="filled">
              Submit
            </Button>
          )}
          {!isEdit && (
            <Button
              onClick={() => setIsEdit((e) => !e)}
              color="green"
              variant="outline"
            >
              Edit
            </Button>
          )}
          <Button
            loading={deleteMutation.isLoading}
            disabled={isEdit}
            onClick={() => handleDelete()}
            color="red"
            variant="outline"
          >
            Delete
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

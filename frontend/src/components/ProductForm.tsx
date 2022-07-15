import {
  Stack,
  TextInput,
  Textarea,
  Group,
  NumberInput,
  Switch,
  Button,
  SimpleGrid,
  LoadingOverlay,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateProduct } from '../modules/products/hooks';
import { ProductCreateValue } from '../modules/products/types';
import { getSKUfromName } from '../utils';

export const ProductForm: React.FC<{}> = ({}) => {
  const form = useForm<ProductCreateValue>({
    initialValues: {
      name: '',
      sku: 'sku_',
      description: '',
      price: 0,
      published: false,
    },
  });
  const mutation = useCreateProduct();

  const handleSubmit = (values: typeof form.values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ position: 'relative' }}
    >
      {mutation.isSuccess ? (
        <Alert my="lg" title="Success" color="green">
          Product created successfully!
        </Alert>
      ) : mutation.isError ? (
        <Alert my="lg" title="Failed to create!" color="red">
          {mutation.error.message}
        </Alert>
      ) : (
        <LoadingOverlay visible={mutation.isLoading} />
      )}
      <Stack>
        <SimpleGrid cols={2}>
          <TextInput
            label="Product Name"
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
        <Textarea
          label="Description"
          autosize
          minRows={2}
          {...form.getInputProps('description')}
        />
        <Group align="flex-end">
          <NumberInput
            label="Price"
            decimalSeparator="."
            required
            min={1.0}
            precision={2}
            step={0.05}
            {...form.getInputProps('price')}
          />
          <Switch
            label="Published"
            {...form.getInputProps('published', { type: 'checkbox' })}
          />
        </Group>
      </Stack>

      <Group position="right" mt={30}>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

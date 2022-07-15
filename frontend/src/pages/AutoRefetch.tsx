import {
  Alert,
  Box,
  Button,
  Group,
  List,
  Loader,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetcher from '../config/fetcher';

const fetchData = async () => {
  const { data } = await fetcher.get<string[]>('/data');
  return data;
};

const addData = async (value: string) => {
  const { data } = await fetcher.get(`/data?add=${value}`);
  return data;
};

const clearData = async () => {
  const { data } = await fetcher.get('/data?clear=true');
  return data;
};

const AutoRefetchPage = () => {
  const qc = useQueryClient();
  const [intervalMs, setIntervalMs] = useInputState(1000);
  const [value, setValue] = useState('');

  const { data, error, isFetching } = useQuery(
    'autoRefetchingData',
    fetchData,
    {
      refetchInterval: intervalMs,
    }
  );

  const addMutation = useMutation((value: string) => addData(value), {
    onSuccess: () => qc.invalidateQueries('autoRefetchingData'),
  });

  const clearMutation = useMutation(() => clearData(), {
    onSuccess: () => qc.invalidateQueries('autoRefetchingData'),
  });

  return (
    <div>
      <Title order={2} mb="md">
        Auto Refetch Page
      </Title>
      <div>
        <Text size="lg" weight={600}>
          Auto Refetch with stale time set to 1s
        </Text>
        <Text mb="md">
          This example is <strong>best experienced</strong> on your own machine,
          where you can open multiple tabs to the same localhost server and see
          your changes <strong>propagate</strong> between the two.
        </Text>
      </div>

      {data ? (
        <>
          <Group align="flex-end">
            <NumberInput
              label="Query Interval speed (ms)"
              description="How often the query will be executed"
              value={intervalMs}
              onChange={setIntervalMs}
              min={500}
              step={100}
            />
            <Box
              sx={(theme) => ({
                alignSelf: 'center',
                width: 10,
                height: 10,
                transform: 'scale(2)',
                backgroundColor: isFetching
                  ? theme.colors.teal[4]
                  : 'transparent',
                transition: !isFetching ? 'all .3s ease-in-out' : 'none',
                borderRadius: '100%',
              })}
            />
          </Group>

          <Paper withBorder p="md" mt="md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addMutation.mutate(value, {
                  onSuccess: () => {
                    setValue('');
                  },
                });
              }}
            >
              <TextInput
                placeholder="Enter some text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </form>

            <List mt="md">
              {data.map((item, i) => (
                <List.Item key={i}>{item}</List.Item>
              ))}
            </List>

            <Button
              color="red"
              mt="lg"
              onClick={() => {
                clearMutation.mutate();
              }}
            >
              Clear
            </Button>
          </Paper>
        </>
      ) : error ? (
        <Alert title="Bummer!" color="red">
          {(error as Error).message}
        </Alert>
      ) : (
        <Group position="center">
          <Loader />
        </Group>
      )}
    </div>
  );
};

export default AutoRefetchPage;

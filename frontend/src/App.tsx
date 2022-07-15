import {
  Anchor,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Divider,
  Group,
  MantineProvider,
  SegmentedControl,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import queryClient from './config/queryClient';
import NotFoundPage from './pages/404';
import Home from './pages/Home';
import ProductPage from './pages/Products';

function AppLayout() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Container py="lg">
      <Title align="center" mb="md">
        React Query Overview
      </Title>

      <Group position="center" mb="md">
        <SegmentedControl
          value={colorScheme}
          onChange={() => toggleColorScheme()}
          data={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </Group>

      <Group position="center">
        <Anchor component={Link} to="/">
          Home
        </Anchor>
        <Divider sx={{ height: 24 }} orientation="vertical" />
        <Anchor component={Link} to="/products">
          Products
        </Anchor>
      </Group>

      <Divider my="lg" />
      <Outlet />
    </Container>
  );
}

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{ colorScheme }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

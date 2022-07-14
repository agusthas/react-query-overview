import {
  Anchor,
  Container,
  Divider,
  Group,
  MantineProvider,
  Title,
} from '@mantine/core';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404';
import Home from './pages/Home';
import queryClient from './config/queryClient';
import ProductPage from './pages/Products';

function App() {
  return (
    <Container py="lg">
      <Title align="center" mb="md">
        React Query Overview
      </Title>

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

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme: 'dark' }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default AppWrapper;

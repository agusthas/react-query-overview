import {
  Anchor,
  Container,
  Divider,
  Group,
  MantineProvider,
  Title,
} from '@mantine/core';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404';
import Home from './pages/Home';

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
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ colorScheme: 'dark' }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default AppWrapper;

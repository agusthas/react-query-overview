import {
  Button,
  Container,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  const theme = useMantineTheme();

  return (
    <Container pt={80}>
      <Text
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          fontSize: 220,
          lineHeight: 1,
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.gray[2],
          marginBottom: theme.spacing.xl * 1.5,

          [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
          },
        }}
      >
        404
      </Text>
      <Title
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          fontSize: 38,

          [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
          },
        }}
      >
        Oops, page not found
      </Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        mx="auto"
        sx={{
          maxWidth: 500,
          marginTop: theme.spacing.xl,
          marginBottom: theme.spacing.xl * 1.5,
        }}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group position="center">
        <Button component={Link} variant="subtle" size="md" to="/">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}

export default NotFoundPage;

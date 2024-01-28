import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { testSchema } from '../../packages/stores/src/schema-store/test-schema';
import { PORT } from './constants';

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema: testSchema });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});

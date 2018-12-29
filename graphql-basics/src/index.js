import { GraphQLServer } from "graphql-yoga";

// Scalar types ->  String, Boolea, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
type Query {
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`
// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, context, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}. You are my favorite ${args.position}`;
      }
      return 'Hello!'
    },
    add(parent, args, context, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((prev, curr) => prev + curr, 0);
    },
    grades(parent, args, context, info) {
      return [99, 80, 93  ];
    },
    me() {
      return {
        id: 'abc456',
        name: 'Mateus',
        email: 'mduraes1994@gmail.com'
      }
    },
    post () {
      return {
        id: 'abc123',
        title: 'GraphQL Basics',
        body: '',
        published: false,
      }
    }
  }
}

// Run server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up.');
});
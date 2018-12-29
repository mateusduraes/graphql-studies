import { GraphQLServer } from "graphql-yoga";

// Scalar types ->  String, Boolea, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
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
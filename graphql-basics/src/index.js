import { GraphQLServer } from "graphql-yoga";

// Scalar types ->  String, Boolea, Int, Float, ID
const users = [
  {
    id: '1',
    name: 'Mateus',
    email: 'mateus@example.com',
    age: 24
  },
  {
    id: '2',
    name: 'Sara',
    email: 'sara@example.com',    
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',    
    age: 31,    
  },
];

const posts = [
  {
    id: '1',
    title: "GraphQL",
    body: 'Hello GraphQL',
    published: true,
  },
  {
    id: '2',
    title: "JavaScript",
    body: 'Javascript is good',
    published: true,
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    users (parent, args, context, info) {
      if (args.query) {
        return users.filter(user => user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()));
      }
      return users;
    },
    posts (parent, args, context, info) {
      if (args.query) {
        return posts.filter(post => {
          const matchTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
          const matchBody = post.body.toLowerCase().includes(args.query.toLowerCase())
          return matchTitle || matchBody
        });
      }
      return posts;
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
    },
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
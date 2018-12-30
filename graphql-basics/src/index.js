import { GraphQLServer } from "graphql-yoga";
import uuidv4 from 'uuid/v4';

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
    author: '1',
  },
  {
    id: '2',
    title: "JavaScript",
    body: 'Javascript is good',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: "Ionic",
    body: 'Ionic is good',
    published: true,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    text: 'Hello 1',
    author: '1',
    post: '1',
  },
  {
    id: '2',
    text: 'Hello 2',
    author: '2',
    post: '2',
  },
  {
    id: '3',
    text: 'Hello 3',
    author: '2',
    post: '2',
  },
  {
    id: '4',
    text: 'Hello 4',
    author: '3',
    post: '1',
  },
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments () {
      return comments;
    }
  },
  Mutation: {
    createUser(parent, args, context, info) {
      const emailTaken = users.some(user => user.email === args.email)
      if (emailTaken) throw 'Email taken.'
      const user = {
        id: uuidv4(),
        ...args,
      }
      users.push(user)
      return user
    },
    createPost(parent, args, context, info) {
      const userExists = users.some(user => user.id === args.author);

      if (!userExists) throw new Error('User not found');

      const post = {
        id: uuidv4(),
        ...args,
      };

      posts.push(post);
      return post;
    },
    createComment(parent, args, context, info) {
      const userExists = users.some(user => user.id === args.author);
      const postExists = posts.some(post => post.id === args.post);

      if (!userExists || !postExists) throw new Error('User or post does not exists');
      const comment = {
        id: uuidv4(),
        ...args,
      };
      comments.push(comment);
      return comment;
    }
  },
  Post: {
    author(parent, args, context, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, context, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, context, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, context, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, context, info) {
      return posts.find(post => post.id === parent.post);
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
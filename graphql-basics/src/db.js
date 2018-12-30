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

const db = { users, posts, comments };
export { db as default };
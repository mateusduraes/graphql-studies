const Query = {
  users(parent, args, { db }, info) {
    if (args.query) {
      return db.users.filter(user => user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()));
    }
    return db.users;
  },
  posts(parent, args, { db }, info) {
    if (args.query) {
      return db.posts.filter(post => {
        const matchTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
        const matchBody = post.body.toLowerCase().includes(args.query.toLowerCase())
        return matchTitle || matchBody
      });
    }
    return db.posts;
  },
  me() {
    return {
      id: 'abc456',
      name: 'Mateus',
      email: 'mduraes1994@gmail.com'
    }
  },
  post() {
    return {
      id: 'abc123',
      title: 'GraphQL Basics',
      body: '',
      published: false,
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export { Query as default };
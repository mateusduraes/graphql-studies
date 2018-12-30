import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email)
    if (emailTaken) throw 'Email taken.'
    const user = {
      id: uuidv4(),
      ...args.data,
    }
    db.users.push(user)
    return user
  },
  
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) throw new Error('User not found');

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);
    return post;
  },

  createComment(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);
    const postExists = db.posts.some(post => post.id === args.data.post);

    if (!userExists || !postExists) throw new Error('User or post does not exists');
    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.comments.push(comment);
    return comment;
  }
};


export { Mutation as default };
// Named export - Has a name. Have as many as needed;
const message = 'Some message from myModule.js';
const name = 'Mateus';
const getGreeting = (name) => `Welcome to the course ${name}`;

// Default export - Has no name. You can only have one.
const location = 'Brazil';

export { message, name, getGreeting, location as default };

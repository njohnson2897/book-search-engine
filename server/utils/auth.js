const jwt = require('jsonwebtoken');
const { GraphQLError }  = require('graphql');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // got this error from module 21 activity 25 auth.js
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNATHENTICATED',
    },
  }),
  // function for our authenticated routes
  // got the syntax to adapt authMiddleware from module 21 activity 25
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization || req.body.token;
    console.log(token);
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch(error) {
      console.log(error);
      console.log('Invalid token');
    }

    return req;

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

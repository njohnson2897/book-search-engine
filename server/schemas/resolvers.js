const { User } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, { user = null, params }) => {
            const foundUser = await User.findOne({$or: [{ _id: user ? user._id : params.id }, { username: params.username }]});
            return foundUser;
        },
    },
    Mutation: {
        login: async (parent, { body }) => {
            const user = await User.findOne({$or: [{ username: body.username }, { email: body.email }] });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(body.password);

            if(!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        saveBook: async (parent, { user, body }) =>  {
            const book = await User.findOneAndUpdate(
                { _id: user._id },
                {  $addToSet: { savedBooks: body }},
                { new: true }
            )
        },
        deleteBook: async (parent, { user, params })  => {
            const updatedUser  = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookid } } },
                { new: true }
            )
        }
    }
}
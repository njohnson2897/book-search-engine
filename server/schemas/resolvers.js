const { User, Book } = require('../models');

const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
    }
    Mutation: {
        login: async ({ body }) => {
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
        }
    }
}
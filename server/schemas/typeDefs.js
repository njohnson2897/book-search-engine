const typeDefs = `
    type Query {
        me: User
    }

    input

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: BookInput!): User
        removebook(bookId: String!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int!
        savedBooks: [Book]
    }

    input BookInput {
        bookId: String!
        authors: [String!]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token
        user: User
    }
    `;

const typeDefs = `
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(_____, description: String!, title: String!, bookId: String!, image: _____, link: ____): User
        removebook(bookId: String!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int!
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String!]
        description: String!
        title: String!
        image:
        link:
    }

    type Auth {
        token: 
        user: User
    }
    `;

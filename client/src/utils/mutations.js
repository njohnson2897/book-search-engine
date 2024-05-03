import { gql } from '@apollo/client';

export const LOGIN_USER  = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user  {
                _id
                name
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const SAVE_BOOK  = gql`
    mutation saveBook($____: _____!, $description: String!, $title: String!, $bookId: String!, $image: _____, $link: ____)  {
        saveBook(___: $____, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
            _id
            name
            bookCount
            savedBooks
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            name
            bookCount
            savedBooks
        }
    }
`;

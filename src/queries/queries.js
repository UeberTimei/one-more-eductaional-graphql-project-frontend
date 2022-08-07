import { gql } from "@apollo/client";


const getBooksQuery = gql`
{
    books{
        id
        name
        genre
    }
}
`

const getAuthorQuery = gql`
{
    authors{
        name
        id
        age
    }
}
`

const addBookQuery = gql`
mutation addBook($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        genre
    }
}
`

const getBookQuery = gql`
query($id: ID){
    book(id: $id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`

export {getAuthorQuery, getBooksQuery, addBookQuery, getBookQuery}
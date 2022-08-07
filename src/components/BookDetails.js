import React from 'react';
import { useQuery } from "@apollo/client";
import { getBookQuery } from '../queries/queries';

const BookDetails = ({bookId}) => {
    const {data, loading, error} = useQuery(getBookQuery, {
        skip: !bookId,
        variables: {
            id: bookId
        }
    });

    let details;

    if(loading){

        details = <h1 style={{color: 'darkkhaki'}}>Loading...</h1>

    } else if(error){

        console.log(error);
        details = <h1>Something went wrong...</h1>

    } else if(bookId){

        const {book: {name, genre, author}} = data;

        const books = author.books.filter(({id}) => id !== bookId).map(({id, name}) => {
            return <li key={id}>{name}</li>
        })

        details = (
            <>
                <h3>{name}</h3>
                <p>{genre}</p>
                <p>{author.name}</p>
                <p>Other books by this author:</p>
                <ul>{books}</ul>
            </>
        );
    };

    return (
        <div id='book-details'>
            {details}
        </div>
    );
};

export default BookDetails;
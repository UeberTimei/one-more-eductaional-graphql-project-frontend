import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';


const BookList = () => {
    const {loading, error, data} = useQuery(getBooksQuery);

    const [selected, setSelected] = useState(null);

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(error){
        return(
            <div>
                Something went wrong
            </div>
        )
    }

    return (
        <div>
            <ul id='book-list'>
                {data && data.books.map(book => 
                    <li key={book.id} onClick={() => setSelected(book.id)}>{book.name}</li>
                )}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    );
};

export default BookList;
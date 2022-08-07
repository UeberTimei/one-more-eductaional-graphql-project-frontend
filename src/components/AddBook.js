import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { getAuthorQuery, addBookQuery, getBooksQuery } from '../queries/queries';

const AddBook = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const {loading, error, data} = useQuery(getAuthorQuery);
    
    const [addBook] = useMutation(addBookQuery);

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        addBook({
            variables:{
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries:[{query: getBooksQuery}]
        })
    }

    return (
        <form id="add-book" onSubmit={(e) => handleSubmit(e)}>

            <div className='field'>
                <label>Book name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className='field'>
                <label>Genre:</label>
                <input type="text" value={genre} onChange={e => setGenre(e.target.value)}/>
            </div>

            <div className='field'>
                <label>Book name:</label>
                <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {data && data.authors.map(author => 
                        <option key={author.id} value={author.id}>{author.name}</option>
                    )}
                </select>
            </div>

            <button>+</button>

        </form>
    );
};

export default AddBook;
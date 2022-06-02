import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../../utils/mutations';
import { QUERY_LISTINGS, QUERY_ME } from '../../utils/queries';
import CloudinaryUploadWidget from '../../utils/cloudinary';
import { renderMatches } from 'react-router-dom';


const ListingForm = () => {
    const [description, setdescription] = useState('');
    const [input, setInput] = useState('')
    const [addListing, { error }] = useMutation(ADD_LISTING, {
        update(cache, { data: { addListing } }) {

            try {
                const { me } = cache.readQuery({ quert: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, listings: [...me.listings, addListing] } },
                })
            } catch (e) {
                console.warn("First listing!")
            }

            const { listings } = cache.readQuery({ query: QUERY_LISTINGS });
            cache.writeQuery({
                query: QUERY_LISTINGS,
                data: { listings: [addListing, ...listings] },
            });
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addListing({
                variables: { description }
            });

            setdescription('');
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            <p>
                {error && <span>Something went wrong...</span>}
            </p>
            <form onSubmit={handleFormSubmit}>
                <input
                    className='input-listing'
                    placeholder='Whatcha got?'
                    value={input} onInput={e => setInput(e.target.value)}
                ></input><br/>
                    <div className="App">
                        <CloudinaryUploadWidget />
                    </div>
                <button type="submit" className='sign-in-form-button'>Submit</button>
            </form>
        </div>
    ); 
};


export default ListingForm;
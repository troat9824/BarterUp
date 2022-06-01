import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../../utils/mutations';
import { QUERY_LISTINGS, QUERY_ME } from '../../utils/queries';
import Cloud from '../../utils/cloudinary';
import { renderMatches } from 'react-router-dom';
import CloudinaryUploadWidget from "../../utils/cloudinary";

const ListingForm = () => {
    const [listingText, setListingText] = useState('');
    const [listingTitle, setListingTitle] = useState('');
    
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
                variables: { listingText, listingTitle }
            });

            setListingText('');
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
                    placeholder='Whatcha got?'
                    defaultValue={listingTitle}
                ></input>
                <input
                    placeholder='yell about it'
                    defaultValue={listingText}
                ></input>
                    <div className="dnj7tfymj">
                        <h1>ml_default</h1>
                        <h2>Upload Widget</h2>
                        <CloudinaryUploadWidget />
                    </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    ); 
};


export default ListingForm;
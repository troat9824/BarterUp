import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../../utils/mutations';
import { QUERY_LISTINGS, QUERY_ME } from '../../utils/queries';

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
                <textarea
                    placeholder='Whatcha got?'
                    value={listingTitle}
                ></textarea>
                <textarea
                    placeholder='yell about it'
                    value={listingText}
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ListingForm;
import React from 'react';
import { useParams } from 'react-router-dom';

import ListingForm from '../ListingForm';
import ListingList from '../ListingList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_LISTING } from '../../utils/queries';

const singleListing = (props) => {
    const { id: listingId } = useParams();

    const { loading, data } = useQuery(QUERY_LISTING, {
        variables: { id: thoughtId },
    });

    const listing = data?.listing || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card">
                <p className="card-title">
                    {/* fill in the content */}
                </p>
            </div>
        </div>
    )
}
const SingleListing = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}
export default SingleListing;
import React from 'react';
import { Link } from 'react-router-dom';

const ListingList = ({ listings, title }) => {
    if (!listings.length) {
        return <h3>No Listings Yet!</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {listings &&
                listings.map(listing => (
                <div key={listing._id} className="card mb-3">
                    <p className="card-header">
                    <Link
                        to={`/profile/${listing.username}`}
                        style={{ fontWeight: 700 }}
                        className="text-light"
                    >
                        {listing.username}
                    </Link>{' '}
                    listed on {listing.createdAt}
                    </p>
                    <div className="card-body">
                    <Link to={`/listing/${listing._id}`}>
                        <p>{listing.listingText}</p>
                        <p className="mb-0">
                        Recommendations: {listing.recommendationCount} || 
                        {listing.recommendationCount ? 'see what others think' : 'be the first to recommend'}
                        </p>
                    </Link>
                    </div>
                </div>
                ))}
            </div>
    )
};

export default ListingList;
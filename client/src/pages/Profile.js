import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import oops from '../assets/oops.jpeg';

import ListingForm from '../components/ListingForm';
import ListingList from '../components/ListingList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();


  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    
    return (
        <div className='text-center'>
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
            <img src={oops} alt="Oops" className='oopsPhoto' />

        </div>
      
    );
  

  };

  return (
    <div className='text-center'>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Welcome Back {userParam ? `${user.username}` : ''}!.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ListingList
            listings={user.listings}
            title={`${user.username}'s listings...`}
          />
        </div>

        
      </div>
      <div className="mb-3">{!userParam && <ListingForm />}</div>
    </div>
  );
};
export default Profile;
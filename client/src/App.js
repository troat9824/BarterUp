// import dependencies/libraries
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext} from '@apollo/client/link/context';

//import components
import Header from './components/Header';
import Footer from './components/Footer';

//import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleListing from './pages/SingleListing';

// create link from GraphQL
const httpLink = createHttpLink({
  uri: '/graphql'
});

// Set Auth token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// set client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// create main page structure
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      {/* This is where the content goes*/}
        <div className="App">
          <header className="App-header">
            <h1>Hello World</h1>
          </header>
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

// keep this
export default App;

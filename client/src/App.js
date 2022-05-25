// these can be deleted
import logo from './logo.svg';
import './App.css';

// import dependencies/libraries
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
    // all of this content of return statement gets deleted
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// keep this
export default App;

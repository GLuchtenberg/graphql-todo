import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';

import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import apolloClient from './services/apollo';


const App = () => (
    <ApolloProvider client={apolloClient}>
        <ApolloProviderHooks client={apolloClient}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Todo />
                </header>
            </div>
        </ApolloProviderHooks>
    </ApolloProvider>
);
export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import {  } from "@apollo/react-hooks";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject, from,  } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.scss'
import { MyProvider } from './core/MyProvider';
// npm install @apollo/client graphql
// npm install jsonwebtoken
// npm install --save-dev @types/jsonwebtoken
// npm install jsonwebtoken-browser
// npm install jwt-decode


 const myClient: any = new ApolloClient({
   uri: "http://localhost:3100/graphql",
   cache: new InMemoryCache(),
  //  resolvers: {},
  //  headers: {
  //    Authorization: token ? token : "",
  //  },
 });


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <MyProvider>
       <ApolloProvider client={myClient}  >
        <BrowserRouter>
         <App />
        </BrowserRouter>
       </ApolloProvider>
      </MyProvider>
  </React.StrictMode>
);
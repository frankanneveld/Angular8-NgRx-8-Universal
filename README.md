# Angular8-NgRx-8-Universal
Boilerplate for Angular 8 with Universal-SSR and NgRx8 with Local Caching

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Introduction:

As we navigate trough an application each url path has one or more endpoints to call,
some data doesn't change that often and doesn't need to be called every time when the user navigate. The idea behind this concept, is to manage data what already is on the client, 
in other words: “What goes to the client stays at the client” - until differences in version are detected.

The application it self only gets the data from the NgRx Store, this **“single source of truth”** updates automatically when newer versions are available on the API.

When building and serving for SSR a cookie is send from the client to the server, the cookie contains the version and if the data on the API is newer the data is transferred via a transfer state key. If the data is the same is doesn't send the data again. And if there is no cookie with a version than the data is also transferred.

When serving while developing with `ng serve` the application isn't use any cookies.
As the data always is stored in the (IndexDB, WebSQL, LocalStore) we can use the cached data to rehydrate the NgRx-Store. For each API-Endpoint we can adjust the caching time and also if there is any need for caching. 

Anyone who wants to help getting this document better or have any good ideas, I would appreciate it a lot. 

## Installing
Command line : `npm i`

## Running

Run `ng serve` for Angular build in development server `http://localhost:4200/`

Run `npm run ssr` for building en serving local on `http://localhost:4000/`


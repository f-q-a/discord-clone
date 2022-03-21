# Welcome to our Discord Clone
by Stephen Choung, Bill Adams, and Felipe Araujo

Discord Clone is a fullstack Postgres, Flask, React, Node app that lets the user talk to each other in private and public servers and channels

As noted above, Discord Clone is a fullstack Postgres, Flask, React, Node application. The majority of the application logic occurs within front end's Redux store and its interactions with the Google Maps Javascript API via the react-google-maps library. Discord Clone uses pure css for styling components.

The backend serves the frontend, responds to frontend requests, and fetches data from the Postgres database.

## Table of Contents
* [MVP Feature List](https://github.com/f-q-a/discord-clone/wiki/Feature-List)
* [Database Schema](https://github.com/f-q-a/discord-clone/wiki/Database-Schema)
* [Backend Routes](https://github.com/f-q-a/discord-clone/wiki/Backend-Routes)
* [Front End Routes](https://github.com/f-q-a/discord-clone/wiki/Frontend-Routes)
* [User Stories](https://github.com/f-q-a/discord-clone/wiki/User-Stories)

## Some Key Features
<li>WebSockets</li>
<li>AWS</li>
<li>Context Menus</li>

## Frontend Overview
Discord Clone is very frontend heavy application. It makes extensive use of 3rd-party APIs and resources to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible.

### Frontend Technologies Used:
#### React
At its core, Discord Clone is a React application. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating Discord Clone would have been a substantially more challenging enterprise.

#### Redux
Redux and the react-redux library were used to manage application state and make fetch requests to the server for data.

All listing information is fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

Redux also stores and sets information about the user. By managing this state in Redux, it provides easy access to the information across components without prop threading. This was particularly important because there were so many components in the application, largely due to all the listings being individual components, that if too many components were re-rendering constantly because of state change it would cause significant performance issues or crash the application completely. Redux provided a relatively simple way to manage this point of complexity.

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in conclusion).

## Backend Overview
Discord Clone uses an Express server with MongoDB as the database. Compared to the frontend, the backend of Discord Clone is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies used with some notes regarding their implementation.

### Backend Technologies Used
#### Flask
Flask was the natural choice for Discord Clone's server-side framework. The minimalism of Flask lent itself to the very light-weight responsibilities of Discord Clone's server. The server is just a couple of routes and a connection to the database, with a few utilities to facilitate this.

### Conclusion and Next Steps
Time to break the 4th wall. Discord Clone was a ton of fun to build.  It was an amazing experience getting to combine something we use in real life with our newer passion for coding.

This also marks the first time that We had built a fullstack app in this stack, and use the context menus, websockets, and AWS. Discord Clone has been an incredibly rewarding to create.

While making Discord Clone, We got to play with a whole bunch of new technologies and get better at even more. At the beginning of the project, We had only learned React 2 weeks previous, and Redux 1 week before. I've come out of it stronger with both, and eager to continue getting better with React and creating cool stuff with the many amazing libraries and technologies of the React ecosystem.

Next Steps: Next steps for Discord Clone may be found in the project todo list, where you can also find a somewhat exhaustive list of the tasks of the project development. And if you want to support this project financially, please make a contribution to Black Lives Matter instead.

Thanks for reading! ✌🏽

## Splash Page
<img src="./react-app/src/images/DiscordIntroGif.gif" width=640px height=360px>

## Basic Feaures
<img src="./react-app/src/images/DiscordAWSContextGIF.gif" width=640px height=360px>
<li>AWS</li>
<li>Context Menus</li>

## WebSocket Features
<!-- <img src="./react-app/src/components/images/YGOGachaCardFlipGIF.gif" width=640px height=360px>
<li>WebSockets</li> -->

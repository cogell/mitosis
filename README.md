# Mitosis
## Making comments come alive.

In this prototype, comments have a dynamic life.  Comments are created by users, voted on by the community, the conversation continues inside the comment in real time, and comments that receive no attention from the community will be pruned from the bunch.  Only the those comments that the community views as benificial will survive.

### Other Notes

The server app has been intentionally seperated into a httpServer and socketServer to address scaling this application. The requirements of the two servers is drastically different and they will need to scale a different rates.

The client app includes the use of the Backbone.Marionette framework to address 'scalability' on the client side.  While a client side app only serves one user at a time it still can be scalable in that it is possible to add and change funcationality quickly.

Comments with zero up votes are deleted every 30 seconds to compress interactions into the timeframe of this prototype presentation. In production, this interval should be changed to a more realistic period, say 24hrs.

Real time interactions: this prototype is wired up to provide realtime interactions between all (socket) connected client applications. These interactions are limited to adding new comments and messaging within each comment's "chatroom."  In the future, live interactions could grow to include live vote updates, live people in each chat room updates, etc.

The map of the world that displays when a user clicks on the map pin was intended to show where users who are currently on the page are located - time ran short to wire up the geolocation functionality.

Because there is no database implimented in this prototype, any actions taken on the frontend will not persist from session to session.

## Getting Started
```bash
npm install
bower install
grunt dev
node app/main.js
```

## CSS3 Features
- animating comment opacity, with @keyframes
- includes google web font 'raleway', with @font-face
- box-sizing the way the god intended, with boz-sizing

## Unfamilar Technology
- node.js, express, websockets

### always be knolling

#### Running Ideas and Todos
- have the number of people chatting increase the 'ups' of the comment
- dry up tracking dependencies in copy.js and require_config.js
- add filtering to comments for chrono and popularity?
- being said right now on the top, like a news ticker!
- can only start a new conversation if your account has enough karma (like stackoverflow?)
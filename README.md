# Mitosis
## Making comments come alive.

Little info about the project here...

Comments with zero up votes are deleted every 10 seconds to compress interactions into the timeframe of this prototype presentation. In production, this interval should be changed to a more realistic period, say 24hrs.

## Getting Started
```bash
npm install
bower install
grunt dev
node app/main.js
```

## Current Status
Most of the functionality is in now rounding out the requirements and adding polish.

## CSS3 Features
- animating comment opacity, with @keyframes
- includes google web font 'raleway', with @font-face
- box-sizing the way the god intended, with boz-sizing

## Unfamilar Technology
- node.js, express, websockets

###
always be knolling

## Running Ideas and Todos
- have the number of people chatting increase the 'ups' of the comment
- dry up tracking dependencies in copy.js and require_config.js
- add filtering to comments for chrono and popularity?
- being said right now on the top, like a news ticker!
- can only start a new conversation if your account has enough karma (like stackoverflow?)
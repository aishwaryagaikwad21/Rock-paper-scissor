# Rock-paper-scissor
A four player game using node.js, express.js and socket.io
## Clone
git clone https://github.com/aishwaryagaikwad21/Rock-paper-scissor
## Steps to run
```sh
 npm init -y
1. # install dependencies
    npm i express socket.io nodemon

2. # Run in terminal
    npm start
    #Or with nodemon
    npm run dev

3. Visit http://localhost:3000
```
## Description

 - Enter your name you want to display to others and room id with whom you want to play.
 
 - Open developer tool to check who have joined the room.
 
 - Only four players can join the game. 
 
 - Since no input mechanism is mentioned, not much of work is done on frontend. Hence keep check on server terminal and client terminal 
    for events taking place in the game room.
    
 - There are 50 rounds in the game. Values for stone, scissor and paper are considered as 7,8,9 for computing. Values are generated randomly.
 
 - Score of each round is displayed in javascript console. Final score and score per player to player basis is also printed in console.

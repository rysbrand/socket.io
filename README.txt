Live Voting App 
-Real time polling app built with node.js, express, and socket.io. Users
vote on their favorite programming lanuage and results update instantly
across all connected clients.

How it works
-User opens the app, connect to the servia via Socket.io. The server sends
the current poll state immediately. When a user click a vote button, vote 
is sent to the server, updating the tally and broadcasting the new results 
for everyone instantly.

Users can also change their vote. The server will automatically remove their 
previous vote before counting the new one. There is also an option to reset
the poll.

Team Roles:
Rebecca Ysbrand - Frontend development. Built the UI and styled the client
interface.

Rylee Smith - Debugging, backend, and presentation. Handled QA, bug fixes,
and prepared project presentation materials.

To Run Locally:
-navigate to appropriate folder

npm install
node server.js

then open broswer at http://localhost:3000
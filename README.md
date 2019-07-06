# Chat Application

Chat application where you can send messages to your friends

## Stack

This application was made using React, Express and Socket.io
Full list of tools used to make this application:

```
- React
- Express
- Socket.io
- MongoDB
- Bootstrap
- React Router
- React Transition Group
```

# How to run this application
To run this application you gotta run this commands in your console:

```
npm run dev
npm start
```

The first one start the backend server on port 7000 and provides connection with database and sends messages to clients.
The second one is used to serve static html, scss files and react js files on port 3000.

# How to use this application

To use this application you have to type
```
http://localhost:3000
```
You'll be redirected to login page, where you have to type your username, next click enter on login and now you can send messages

# Database

To check all existing messages you have to run
```
mongo
```
in your mongo db folder, next type
```
use chat
db.data.find().pretty();
```
it'll show you all existing messages in the database.

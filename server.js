const express = require('express');
const app = express();
const server =  require('http').createServer(app);
const io = require('socket.io').listen(server);
const mongo = require('mongodb').MongoClient;

const port = 7000;

let users = {};

app.use(express.static('public'));

mongo.connect('mongodb://127.0.0.1', (err, db) => {
    if(err) {
        throw err;
    }

    console.log('MongoDB connected');

    // connect to socket.io
    io.on('connection', socket => {
        // mongo database
        let chat = db.db('chat').collection('data');
        
        // new user connected so send user name and all messages
        socket.on('new-user', name => {
            if(name) {
                users[socket.id] = name;
                chat.insert({
                    user: users[socket.id],
                    message: `${name} dołączył`
                })
                io.emit('chat-message', `${name} dołączył`);
            }
        });

        // send all messages
        socket.on('get-messages', user => {
            let messages = chat.find().limit(100).sort({_id:1}).toArray((err, data) => {
                if(err)
                    throw err;

                socket.emit('data', data);
            });
        })

        // user send a maessage
        socket.on('send-chat-message', message => {
            chat.insert({
                user: users[socket.id],
                message: `${users[socket.id]}: ${message}`
            });
            io.emit('chat-message', `${users[socket.id]}: ${message}`);
        });

        // user disconnected from the app
        socket.on('disconnect', () => {
            if(users[socket.id]) {
                chat.insert({
                    user: users[socket.id],
                    message: `${users[socket.id]} odszedł`
                })
                socket.broadcast.emit('chat-message', `${users[socket.id]} odszedł`);
                delete users[socket.id];
            }
        });
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
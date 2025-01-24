const express = require("express");
const http = require("http");
const path = require("path")
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io= socketIo(server)
app.use(express.static(path.join(__dirname, 'public')))
const users = new Set()

io.on("connection",(socket)=>{
    console.log("a user is now connected");

    

    // handle users when they will join the chat
    socket.on("join",(userName)=>{
        users.add(userName)
        socket.userName = userName;

        // broadcast to all client /users that a new user has joined
        io.emit('userJoined',userName);

        // send the updated user list  to all clients
        io.emit('userList',Array.from(users))
    })

    // handle incoming chat message
    socket.on('chatMessage',(message)=>{
        //broadcast the received message to all connected clients
        io.emit('chatMessage',message);
    })

    // handle user disconnetion
    socket.on("disconnect",()=>{
        console.log("An user is disconnected");

        users.forEach(user=>{
            if (user === socket.userName) {
                users.delete(user)

                io.emit('userLeft',user)

                io.emit("userList",Array.from(users))
            }
        })
        
    })


})


const PORT =3001
server.listen(PORT,()=>{
    console.log("server is now running");
    
})
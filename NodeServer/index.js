//Node Server which will handle io connections
const io=require('socket.io')(8000);

const users={};

io.on('connection',socket=>{
    console.log("hello");
    socket.on('new-user-joined',name=>{
        console.log("New user joined",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',  message=>{
        socket.broadcast.emit('receive',{ message:message, name:users[socket.id]})
    });
    
});
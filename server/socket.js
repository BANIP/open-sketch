module.exports = function(server){
    const io = require('socket.io')(server);
    
    io.on("connection", function(socket){
        console.log("new connection!!");

        socket.on("draw", function(data){
            socket.broadcast.emit("draw",data);
        });
    })
}
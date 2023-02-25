const path = require("path")
const express = require("express")
const app = express()

//settings
app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")))

//start the server
const server = app.listen(app.get("port"), () => {
    console.log("aplicacion en el puerto", app.get("port"))
})

const SocketIO = require("socket.io")
const io = SocketIO(server)

let usuarios_conectados = 0;

//websockets
io.on("connection", (socket) => {
    console.log("new connection", socket.id)
    usuarios_conectados++

    socket.on("chat:message", (data) => {
        io.sockets.emit("chat:message", data)
    })

    socket.on("chat:typing", (data) => {
        socket.broadcast.emit("chat:typing", data)
    })

    io.emit("actualizar", usuarios_conectados)

    socket.on("disconnect", function() {
        console.log("usuario desconectado " + socket.id )
        usuarios_conectados--
    })
})






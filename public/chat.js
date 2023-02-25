const socket = io()

// DOM elements
let message = document.getElementById("message")
let username = document.getElementById("username")
let btn = document.getElementById("send")
let output = document.getElementById("output")
let actions = document.getElementById("actions")

btn.addEventListener("click", function() {
    socket.emit("chat:message",{
        username: username.value,
        message: message.value
    })
})

message.addEventListener("keypress", function () {
    socket.emit("chat:typing", username.value)
})

socket.on("chat:message", function (data) {
    actions.innerHTML = "";

    if (username.value == "" && message.value != ""){

        output.innerHTML += `<p style="color:#575ed8;">
        <strong>invitado</strong>: ${data.message}
        </p>`

        var chatwindow = document.getElementById("chat-window");
        chatwindow.scrollTop = chatwindow.scrollHeight;

    }else if(username.value == "" && message.value != ""){

        output.innerHTML += `<p style="color:#575ed8;">
        <strong> ${data.username}</strong>: ${data.message}
        </p>`

        var chatwindow = document.getElementById("chat-window");
        chatwindow.scrollTop = chatwindow.scrollHeight;
    }
})

socket.on("chat:typing", function(data) {
if (data == ""){
    actions.innerHTML = `<p><em>Invitado esta escribiendo...</em></p>`
}else{
    actions.innerHTML = `<p><em>${data} esta escribiendo...</em></p>`
}
})

socket.on("actualizar", (usuarios_conectados) => {

    if ( usuarios_conectados == 1 ){
        document.getElementById("numero-usuarios-conectados").innerHTML = "Solo vos estas en linea"
    }else{
        document.getElementById("numero-usuarios-conectados").innerHTML = usuarios_conectados + " usuarios conectados"
    }
    
})
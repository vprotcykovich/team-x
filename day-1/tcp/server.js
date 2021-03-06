//Provides the foundation for creating TCP server.
const TCP = require('net');

const HOST = '127.0.0.1', PORT = 3000;

// Creates a server instance, and chain the listen function to it.
TCP.createServer(function (connection) {
    // The socket object that is assigned to the connection automatically.
    let clientHostPort = connection.remoteAddress + ':' + connection.remotePort;
    console.log(getTime() + 'CONNECTED CLIENT: ' + clientHostPort);

    // Adds a 'data' event handler.
    connection.on('data', function (data) {
        console.log(getTime() + 'MESSAGE FROM ' + clientHostPort + ': "' + data + '"');
        // Writes the data back to the socket, the client will receive it as data from the server
        connection.end('You said "' + data + '"');
    });

    // Adds a 'close' event handler.
    connection.on('close', () => console.log(getTime() + 'CLOSED: ' + clientHostPort));
}).listen(PORT, HOST);

console.log(getTime() + 'The server is listening on ' + HOST + ":" + PORT);

//Returns the current time with brackets.
function getTime() {
    let date = new Date();
    let timeArray = [date.getHours(), date.getMinutes(), date.getSeconds()];
    for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i] < 10) timeArray[i] = '0' + timeArray[i];
    }
    return '[' + timeArray.join(':') + ']';
}
const { Server } = require('socket.io');

class RTConnection {

    constructor(httpserver) {
        this.ws = new Server(httpserver);
        this.clients = new Map();
        this.init()
    }

    init() {
        this.ws.on('connection', (socket) => {

            this.onNewClientConnected(socket);

            socket.on('destroy', () => {this.onClientDisconnected(socket)});
        });
    }

    onNewClientConnected(socket) {
        this.clients.set(socket.id,socket);
        console.log('new client connected: '+socket.id);
    }

    triggerEvent(eventname,data) {
        [...this.clients.values()].forEach((socket) => {
            socket.emit(eventname,data);
        });
    }

    onClientDisconnected(client) {
        this.clients.delete(client.id);
        console.log('client disconnected '+client.id);
    }


}

module.exports = RTConnection;
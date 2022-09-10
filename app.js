const express = require('express');
const http = require('http');
const RTConnection = require('./realtimeconnection');
const contactapiv1routes = require('./routes/contacts.api.v1');
const viewroutes = require('./routes/view.routes');

const app = express();
const server = http.Server(app);
const rtconnection = new RTConnection(server);

app.use(express.static(__dirname+'/public'));
app.use(express.json());

contactapiv1routes(app, rtconnection);
app.use('/',viewroutes);

server.listen(process.env.PORT || 80, (err) => {
    if (err) console.error(err);
});
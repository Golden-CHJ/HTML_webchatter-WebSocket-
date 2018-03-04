var app=require('express')();
var http=require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);/*That will install the module and add the dependency to package.json. Now let’s edit index.js to add it:*/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
var sum=1;
var t_name='';
io.on('connection', function(socket){
    //console.log('a user connected');
    /******/
    socket.on('user_name',function (name) {
        sum++;
        console.log(name+' connected'+"    now  "+ sum+"  in the room");
        socket.username=name;
        io.emit('user_name',name,sum);

t_name=name;
    })
    /******/
    socket.on('chat message',function (msg) {
        console.log('message:'+msg);
        io.emit('chat message', msg, socket.username);

    });
    socket.on('disconnect', function(){
        console.log('a user disconnected');
       io.emit('disconnect',t_name)
        sum--;
    });
});
http.listen(port, function(){
    console.log('listening on *:'+port);
});
/*This translates into the following:

    Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2).
    We define a route handler / that gets called when we hit our website home.
    We make the http server listen on port 3000.
*/
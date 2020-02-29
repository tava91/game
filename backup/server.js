//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
//const app = express.createServer();

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n 1');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
var allowedOrigins = ['http://127.0.0.1:5500'];
app.use(cors({
  origin: 'http://127.0.0.1:5500'
  
  /*
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
  */
  //,exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  //credentials: true

}));

app.get('/DB/Tavalas/character.json', function(req, res, next) {
  console.log(res);
  res.json({msg: 'This is CORS-enabled for only example.com.'})
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
 console.log(req.body);
});

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/', function(request, response){
    console.log(request.body);
});
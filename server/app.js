const express = require('express');
const fs = require('fs');
const app = express();

// https://github.com/expressjs/morgan
// https://expressjs.com/en/4x/api.html#req.path
// http://localhost:3000/

var logs = [];
var fullLogs = [];

app.use( (req, res, next) => {
// write your logging code here
var newLog = {
  'Agent': (req.headers['user-agent']).toString().replace(',',''),
  'Time': new Date().toISOString(),
  'Method': req.method,
  'Resource': req.path,
  'Version': req.protocol.toUpperCase() + '/' + req.httpVersion, // Should equal 'HTTP/1.1'
  'Status': 200,
};
var newLine = "";
for( var elem in newLog ){
  newLine += newLog[ elem ] + ',';
};
newLine = newLine.slice( 0, newLine.length - 1 ); // Remove last character
newLine += '\n';
  fs.appendFile( 'log.csv', newLine,( err ) => {
    if( err ) throw err;
  });
  // Add Check for File Length Here
logs.push( newLog );
console.log( newLine )
next();
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
res.status( 200 ).send( 'ok' ); // Send this message to agents
});

// Return a JSON object containing the log data when accessing logs path

app.get( '/logs', ( req, res ) => {
  fs.readFile( './log.csv', 'utf8', ( err, resData ) => {
    if( err ) throw err;
    var bufferString = resData.toString();
    var logArr = bufferString.split( '\n' );
    var dataLog = [];
    var headers = logArr[ 0 ].split( ',' );
    for( var i = 1; i < logArr.length - 1; ++i ){
      var data = {};
      var row = logArr[ i ].split( ',' );
      for( var j = 0; j < row.length; ++j ){
        data[ headers[ j ] ] = row[ j ];
      }
      console.log( 'data', data );
      dataLog.push( data );
    }
    return res.json( dataLog );
  })
})


module.exports = app;

// Questions
  // Try-Catch
// Additions
  // Log Count Implementation

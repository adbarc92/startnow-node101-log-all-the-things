// Return a JSON object containing the log data when accessing logs path

app.get('/logs', (req3, res3) => {
  // Read CSV file
  // res3data is buffer object
  fs.readFile('./log.csv', (err, res3data) => {
    if (err) throw err;
    // Covert buffer object to string
    console.log( res3data );
    var bufferString = res3data.toString();
    // Split the string object variable 'bufferString' at each newline to create an array of strings
    console.log( bufferString );
    var logArr = bufferString.split('\n');
    // Array of final data here
    var dataLog = [];
    // Get headers row from logArr
    var headers = logArr[0].split(',');
    for (var i = 1; i < logArr.length - 1; i++) {
      var theData = {};
      var row = logArr[i].split(',');
      for (var x = 0; x < row.length; x++) {
        theData[headers[x]] = row[x];
      }
      dataLog.push(theData);
    }
    res3.json(dataLog);
  });
});

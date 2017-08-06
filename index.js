//Imports for node
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Create an instance of Express for the app and instantiate bodyParser and cors
const app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//Get call to return json that formats natural and unix date
app.get(`/dateValues/:dateVal`, (req,res,next) => {
  //gets date from request
  var dateVal = req.params.dateVal;

  //Options for formatting date in natural state
  var options = { year: 'numeric', month: 'long', day: 'numeric' };

  if(isNaN(dateVal)) {
    var naturalDate = new Date(dateVal);
    naturalDate= naturalDate.toLocaleDateString('en-US', options);
    //Adds 21600 seconds, 6 hours, to make up for timezone
    var unixDate = new Date(dateVal).getTime()/1000-21600;

  } else {
    var unixDate = dateVal;
    //Subtracts 21600 seconds, 6 hours, to make up for timezone
    var naturalDate = new Date((parseInt(dateVal)+21600)*1000);
    naturalDate= naturalDate.toLocaleDateString('en-US', options);
  }
  if (naturalDate === 'Invalid Date') {
    naturalDate = null;
  }
  //returns data as a json object
  res.json({unix: unixDate, natural: naturalDate});
});

app.listen(3000, () => {
  console.log('Its Working');
});

/* Read more about the server here : https://github.com/ajithnn/exprestify , This has been specifically written for REST API calls */



var express = require('express') // Express node module, Helps to write GET and POST calls in a easy way.
var curValue = "none"; // Shared Variable used to share data between GET and POST Request. Not ideal. Should use a DB.
var rest = require('exprestify')
var sent_data;
var app = express(); // Init express.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Allow cross rigin requests, as the client and server arenot on the same domain.
opt = {
    extended: false
}
var options = {
    contentType: "json",
    config: opt
}

var flag_same = "0" //The data is not the same sending "0" instead of 0 because 0 will not be shown, there are some fixes required in exprestify



rest.get('/number', function(){
      return curValue;
})
rest.get('/bitval',function(){
  console.log(flag_same);
  return flag_same;
});
rest.post('/number', function (err, data) {
    if (!err) {
        console.log(data.value);
        curValue = data.value;
        console.log(curValue);
        //flag_same = 1;
        if (sent_data == curValue){
          flag_same ="1"; // Don't send the value
        }
        else{
          sent_data = curValue;
          flag_same = "0";
          return curValue;
        }
    } else {
        console.log(err);
    }
}, options)



rest.listen(process.env.PORT||3000, function () {
    console.log("Listening on port 0.0.0.0:%s", rest.port)
})

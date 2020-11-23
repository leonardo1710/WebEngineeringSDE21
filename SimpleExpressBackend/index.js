var express = require("express");
var app = express();


//localhost:3000/persons
app.get("/simpsons", (req, res) => {
  res.json(["Bart", "Lisa", "Marge", "Homer", "Maggie"]);
 });


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
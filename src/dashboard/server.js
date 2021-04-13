const express = require('express')

const app = express();


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
  });

  app.use("/Tickets", express.static(__dirname + '/Tickets'));
  app.use("/", express.static(__dirname + "/"));

app.listen(80, () => console.log(`Server is now live on port 80!`))
const express = require('express');
const port = 3000;
const app = express();
const path = require('path')

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/flex.html')))

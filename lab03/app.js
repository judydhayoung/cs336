const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static('public'))

//from lab:

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')))
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



//access with url: http://localhost:3000/images/schedule.jpeg

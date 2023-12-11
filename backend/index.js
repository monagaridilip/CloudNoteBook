const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

//To use the body we have to use middleware 
app.use(cors())
app.use(express.json())

//Availiable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
  
app.listen(port, () => {
  console.log(`CloudNoteBook is running on http://localhost:${port}`)
})
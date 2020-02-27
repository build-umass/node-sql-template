const express = require('express')
const app = express()

app.use('/users', require('./routes/users'))

const port = 8080
app.listen(port, () => console.log(`Server listening on port ${port}.`))
const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('common'))

app.get('/', (req, res, next) => {
  console.log("this is my first middleware")
  next();
})

app.get('/dogs', (req, res) =>{
  res.send('Woof Woof')
})

app.listen(3000, () => {
  console.log('App is running on localhost:3000')
})
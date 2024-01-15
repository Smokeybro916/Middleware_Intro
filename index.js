const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('tiny'))

app.use((req, res, next) =>{
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
})

app.use('/dogs', (req, res, next) => {
  console.log("I love dogs")
  next();
})



/*app.get('/', (req, res, next) => {
  console.log("this is my first middleware")
  next();
})
*/

app.get('/', (req, res) => {
  console.log(`Request Date: ${req.requestTime}`)
  res.send('Home Page')
})

app.get('/dogs', (req, res) =>{
  console.log(`Request Date: ${req.requestTime}`)
  res.send('Woof Woof')
})

app.use((req, res) => {
  res.send('Not Found!')
})

app.listen(3000, () => {
  console.log('App is running on localhost:3000')
})
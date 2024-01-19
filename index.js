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

const verifyPassword = (req, res, next) => {
  const{password} = req.query;
  if(password === 'chickennugget'){
    next();
  }
  //res.send("Password Needed")
  throw new Error('Password required!')
}

app.get('/', (req, res) => {
  console.log(`Request Date: ${req.requestTime}`)
  res.send('Home Page')
})

app.get('/error', (req, res) => {
  chicken.fly()
})

app.get('/dogs', (req, res) =>{
  console.log(`Request Date: ${req.requestTime}`)
  res.send('Woof Woof')
})

app.get('/secret', verifyPassword, (req, res) => {
  res.send('My secret is : I wear headphones in public to not talk to anyone')
})

app.use((req, res) => {
  res.status(404).send('Not Found!')
})

app.use((err, req, res, next) => {
  console.log("******")
  console.log("***ERRRORRR**")
  console.log("******")
  next();
})

app.listen(3000, () => {
  console.log('App is running on localhost:3000')
})
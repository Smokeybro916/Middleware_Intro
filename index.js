const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');


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
  throw new AppError('password require', 401)
  //res.send("Password Needed")
  //throw new AppError(401, 'Password required!')
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
  const {status = 500, message = 'Something went wrong'} = err;
  res.status(status).send(message)
})

app.listen(3000, () => {
  console.log('App is running on localhost:3000')
})
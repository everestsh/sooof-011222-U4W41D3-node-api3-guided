const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.use((req, res, next)=>{
  // here we can do whatever:
  // 1- respond to clients
  // 2- simply allow the request to flow to the next middleware
  // 3- respond with an error
  // res.json('foobar')

  console.log('the req flowed through our custom middleware')
  res.set('X-Web-49', 'Rocks') // setting a header on the response
  res.set('Set-Cookie', 'foo=bar') // setting a cookie on the browser
  next()
  next({ status: 422, message: 'this is horrible'})
})



server.get('/', (req, res) => {
  res.send(`
    <h2>Hubs API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

server.use((err, req, res, next) => { // eslint-disable-line
  console.log('disaster!')
  res.status(err.status || 500).json({
    message: `The Horror: ${err.message}`,
  })
})

module.exports = server;

import express from "express";
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 5000;

// This is for the public folder on path /  
app.use(express.static('public'));

// method to use JSON
app.use(express.json());

// method to use Urlencoded
app.use(express.urlencoded({ extended: true }));

// This is for proxies
app.set('trust proxy', 'loopback');
// This is for images folder on path images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
  // get the data first from database
  res.json(data);
});

//JSON data
//{"hello":"JSON is cool"}
// URLEncoded data
// hello=URLEncoded+is+cool
app.post('/newItem', (req, res) => {
  res.send(req.body);
});

app.get('/item/:id', (req, res, next) => {
  //This is the middleware that pulls the data
  let user = Number(req.params.id);
  res.send(data[user]);
  // middleware that uses the request object
  console.log(`Request from: ${req.originalUrl}`);

  // Everything above is middleware
  next();
}, (req, res) => {
});

app.route('/item')
  .get((req, res) => {
    //res.download('images/rocket.jpg');
    //res.redirect('http://www.linkedin.com');
    //res.end();
    res.send(`a get request with /item on port ${PORT}`)
  })
  .put((req, res) => {
    res.send(`a put request with /newItem on port ${PORT}`)
  })
  .delete((req, res) => {
    res.send(`a delete request with / route on port ${PORT}`)
  });

// Error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Red Alert:${err.stack}`);
});

app.listen(PORT, () => {
  console.log(`Your Server is running on port ${PORT}`);
});
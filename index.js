const path = require('path');
const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const app = new express();
const connectionString = process.env.mongo_uri;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const Post = require('./database/models/Post');

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('You are now connected to Mongo!'))
    .catch(err => console.error('Something went wrong', err))

app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge.engine);

app.set('views', __dirname + '/views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const storePost = require('./middleware/storePost');
app.use('/posts/store', storePost);

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
    posts
  })
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post
  })
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', (req, res) => {
  const {
    image
  } = req.files
  
  image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
    Post.create({
      ...req.body,
      image: `/posts/${image.name}`
    }, (error, post) => {
      res.redirect('/')
    })
  })
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(4000,() => {
  console.log('app listening to port 4000');
})
const express = require("express");
const expressEdge = require("express-edge");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo").default;
const connectFlash = require("connect-flash");

var morgan = require("morgan");

//TODO: susun ini buat rapi
const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const deletePostController = require("./controllers/deletePost");
const pagingController = require("./controllers/paging");
const searchController = require("./controllers/search");
const searchPostController = require("./controllers/searchPost");
const aboutController = require("./controllers/about");
const sitemapController = require("./controllers/sitemap");
const commentController = require("./controllers/storeComment");

const app = new express();

//app.use(morgan('dev'));

function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https
  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.all("*", checkHttps);

app.use(
  expressSession({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

app.use(connectFlash());

const connectionString = process.env.mongo_uri;
mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("You are now connected to Mongo!"))
  .catch(err => console.error("Something went wrong", err));

app.use(
  expressSession({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: mongoStore.create({
      mongoUrl: connectionString,
      clientPromise: mongoose.connection
    })
  })
);

app.use(express.static("public"));
app.use(expressEdge.engine);
app.set("views", __dirname + "/views");

app.use(fileUpload());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");
const checkId = require("./middleware/checkId");

app.use("/posts/store", storePost);

//TODO: susun routing biar rapi
app.get("/", homePageController);

//TODO
//buat daftar isi page app.get("/p")

app.get("/about", aboutController);
app.get("/search", searchController);
app.get("/sitemap", sitemapController);
app.get("/posts/new", auth, createPostController);

app.get("/p/:page", pagingController);
app.post("/posts/store", auth, storePost, storePostController);
app.post("/post/comment/:id", auth, checkId, commentController);
app.get("/post/:id", checkId, getPostController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.get("/auth/logout", logoutController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.post("/post/delete/:id", auth, checkId, deletePostController);
app.get("/search/post", searchPostController);

//show 404 if dont have matching route
app.use(function(req, res, next) {
  res.status(404);
  const title = "WeekyDay Blog | Kosonk?!";
  res.render("notFound", { title: title, auth: req.session.userId });
});

app.listen(4000, () => {
  console.log("app listening to port 4000");
});

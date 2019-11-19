const express = require("express");
const expressEdge = require("express-edge");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

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

const app = new express();

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
    useCreateIndex: true
  })
  .then(() => console.log("You are now connected to Mongo!"))
  .catch(err => console.error("Something went wrong", err));

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
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

//sitemap config
// const routes = app._router.stack.map((r) => r.route ? r.route.path : null);
// console.log(routes);

const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");
const checkId = require("./middleware/checkId");

app.use("/posts/store", storePost);

//TODO: susun routing biar rapi
app.get("/", homePageController);
// app.get(["/p/:page", "/p"], pagingController);
app.get("/p", pagingController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/post/:id", checkId, getPostController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.get("/auth/logout", logoutController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/post/delete/:id", auth, checkId, deletePostController);
app.get("/search", searchController);
app.get("/search/post", searchPostController);
app.get("/about", aboutController);
// app.get("/sitemap", sitemapController);
app.get("/sitemap", (req, res) => {
  // This is just the domain you'll append the routes to
  const fh = process.env.blog_url;
  // we extract not null routes
  const routes = app._router.stack
    .map(r => (r.route ? r.route.path : null))
    .filter(r => r != null);
  // parse each routes in an array of array containing all the possible params rotations
  const realRoutes = parseRoutes(routes);
  // filter out null values and flatten the array
  const flattened = flattenArray(realRoutes);
  // insert it into our XML
  const sitemapOutput = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${flattened.map(r => `<url><loc>${fh}${r}</loc></url>`).join("")}
    </urlset>`;
  // just send it
  res.status(200).end(sitemapOutput);
})

// site map controller func
function parsePattern(subPattern) {
  let acceptedValues = subPattern
    ? subPattern.match(/\((\|?([a-z0-9-]+)\|?)+\)/gi)
    : null;
  if (acceptedValues) {
    acceptedValues =
      acceptedValues && acceptedValues.length
        ? acceptedValues[0].substr(1, acceptedValues[0].length - 2).split("|")
        : null;
    const urlMap = acceptedValues
      ? acceptedValues.map(param => {
          const optionRegex = new RegExp(
            `\\((([a-z0-9-]+\\|)+)?(${param})((\\|[a-z0-9-]+)+)?\\)`,
            "ig"
          );
          return subPattern.replace(optionRegex, `$3`);
        })
      : null;
    return parseRoutes(urlMap);
  }

  return subPattern;
}

function parseRoutes(routes) {
  const realRoutes = routes.map(route => {
    const subPattern = route.replace(
      /(:[a-z]+)?(\(([a-z0-9-]+\|?)+\))+/gi,
      `$2`
    );
    const acceptedValues = parsePattern(subPattern);
    return acceptedValues;
  });

  return realRoutes;
}

function flattenArray(arr) {
  const isNotFlat = arr.filter(a => typeof a === "object");
  if (isNotFlat.length) {
    const newFlat = [].concat.apply([], arr);
    return flattenArray(newFlat);
  }
  return arr;
}

//show 404 if dont have matching route
app.use(function(req, res, next) {
  res.status(404);
  const title = "WeekyDay Blog | Kosonk?!";
  res.render("notFound", { title });
});

app.listen(4000, () => {
  console.log("app listening to port 4000");
});

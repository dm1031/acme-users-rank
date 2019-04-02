const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { User, syncAndSeed } = require("./db");

const port = process.env.PORT || 3000;

//NOTE: the two routes below, '/app.js' and '/' both serve up static files (files that don't change/aren't dynamic). It's very common in only slightly larger projects to have a lot of static files (images, css style sheets, etc.) When this is the case, it quickly becomes cumbersome to write a unique route for each individual resource. A common solution is to put all static files in the same folder, usually named 'public'. Then express has a handy middleware function, express.static, that we can use to efficiently serve all static files at once.

//Usage would looks something like this:

//*after creating a folder 'public' in the root directory with the below structure
//public
// ├───app.js
// ├───index.html

// app.use(express.static(__dirname + 'public'))

//and that's it!

//more info on express.static: https://expressjs.com/en/starter/static-files.html
//more info on static serving in general: https://stackoverflow.com/questions/18900990/express-js-node-js-how-does-static-file-serving-really-work

app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "dist", "main.js"))
);
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.use(bodyParser.json());

//NOTE: syncAndSeed is async and returns a promise so, theoretically, after initially starting the server, it could get hit with requests that try to access the db before the database has finished syncing. There are a number of ways around this. A simple solution would be to chain a .then onto the syncAndSeed call and then run app.listen() within the callback.

//While this is a very unlikely edge case, it's definitely worth getting used to programming/thinking more defensively.
syncAndSeed();

app.get("/api/users", (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

app.post("/api/users/create", (req, res, next) => {
  User.create({
    name: req.body.name,
    bio: req.body.bio,
    rank: req.body.rank
  })
    .then(user => res.send(user))
    .catch(next);
});

app.delete("/api/users/:uuid", (req, res, next) => {
  User.destroy({
    where: {
      uuid: req.params.uuid
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.put("/api/users/:uuid", (req, res, next) => {
  User.findByPk(req.params.uuid)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

app.listen(port, () => console.log(`listening on port ${port}`));

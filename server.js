const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { User, syncAndSeed } = require('./db')

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.use(bodyParser.json());

syncAndSeed()

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next)
})

app.post('/api/users/create', (req, res, next) => {
    User.create({
        name: req.body.name,
        bio: req.body.bio,
        rank: req.body.rank
    })
    .then(user => res.send(user))
    .catch(next)
})

app.delete('/api/users/:uuid', (req, res, next) => {
    User.destroy({
        where: {
            uuid: req.params.uuid
        }
    })
    .then( () => res.sendStatus(204))
    .catch(next)
})

app.put('/api/users/:uuid', (req, res, next) => {
    User.findByPk(req.params.uuid)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next)
})

app.listen(port, () => console.log(`listening on port ${port}`))

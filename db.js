const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL)

const User = conn.define('users', {
    name: Sequelize.STRING,
    bio: Sequelize.STRING,
    rank: Sequelize.INTEGER
})

const syncAndSeed = () => {
    return conn.sync({ force: true })
        .then( () => {
            return Promise.all([
            User.create({ name: 'moe', bio: 'moe is great', rank: 2 }),
            User.create({ name: 'larry', bio: 'larry is fun', rank: 2}),
            User.create({ name: 'curly', bio: 'curly is cool', rank: 4 })
            ])
        })
        .catch(ex => console.log(ex.message))
}

module.exports = {
    User,
    syncAndSeed
}

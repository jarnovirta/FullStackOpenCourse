var router = require('express').Router()
var User = require('./../models/user')
var bcrypt = require('bcrypt')

router.post('/', async (request, response) => {
    try {
        let user = request.body

        if (!user.username || user.username.length === 0
            || !user.name || user.name.length === 0
            || !user.password || user.password.length < 3) {
          return response.status(400).send({
              error: 'User\'s name, username and password must not be empty. Password must be min. 3 characters long.' })
        }
        const existingUser = await User.findOne({ username: user.username})
        if (existingUser !== null) return response.status(400).send({
            error: 'Username already exists'
        })
        if (user.adult === undefined) user.adult = true
        const saltRounds = 10
        user.passwordHash = await bcrypt.hash(user.password, saltRounds)
        let mongoUser = new User(user)
        mongoUser = await mongoUser.save()
        response.status(201).json(User.format(mongoUser))
      }
      catch (e) {
        console.log(e)
        response.status(500).json({ error: 'something went wrong...' })
      }
})
router.get('/', async (request, response) => {
    try {
        let users = await User.find({}).populate('blogs')
        users = users.map(User.format)
        response.json(users)
    }
    catch (e) {
        console.log(e)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router
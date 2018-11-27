const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})
UserSchema.statics.format = (user) => {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult,
    id: user._id
  }
}
const User = mongoose.model('User', UserSchema)

module.exports = User
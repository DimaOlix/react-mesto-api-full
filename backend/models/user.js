const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    default: 'Жак-Ив Кусто',
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    default: 'Исследователь',
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: val => /https?:\/\/[w{3}]?[0-9a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/.test(val),
    },
  },
},
{
  toObject: { useProjection: true },
  toJSON: { useProjection: true },
},
{
  versionKey: false,
});


module.exports = mongoose.model('User', userSchema);

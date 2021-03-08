const bcrypt = require('bcrypt')
const createGuts = require('../helpers/model-guts')

const name = 'User'
const tableName = 'users'

const selectableProps = [
  'id',
  'fullName',
  'email',
  'password',
  'phone',
  'account_verified',
  'updated_at',
  'created_at'
]

const SALT_ROUNDS = 10
const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS)

const beforeSave = user => {
  if (!user.password) return Promise.resolve(user)

  return hashPassword(user.password)
    .then(hash => ({ ...user, password: hash }))
    .catch(err => `Error hashing password: ${err}`)
}

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  })

  const create = props => beforeSave(props)
    .then(user => guts.create(user))

  return {
    ...guts,
    create,
  }
}

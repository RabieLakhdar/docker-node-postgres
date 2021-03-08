const { User } = require('../models')
const knex = require('../database/knex');

const postUsers = (req, res, next) => {
  const props = req.body.user
  User.create(props)
    .then(user => res.json({
      ok: true,
      message: 'User created',
      user
    }))
    .catch(next)
}

const getUsers = (req, res, next) => {
  User.findAll()
    .then(users => res.json({
      ok: true,
      message: 'Users found',
      users
    }))
    .catch(next)
}

const getUser = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
    .then(user => res.json({
      ok: true,
      message: 'User found',
      user
    }))
    .catch(next)
}

const putUser = (req, res, next) => {
  const userId = req.params.id
  const props = req.body.user

  User.update(userId, props)
    .then(user => res.json({
      ok: true,
      message: 'User updated',
      user
    }))
    .catch(next)
}

const deleteUser = (req, res, next) => {
  const userId = req.params.id

  User.destroy(userId)
    .then(deleteCount => res.json({
      ok: true,
      message: `User '${userId}' deleted`,
      deleteCount
    }))
    .catch(next)
}

const getUsersByDepartment = async (dep, res, next) => {
  return await knex
    .select('*')
    .from('departments as dep')
    .join('users as u', 'dep.id', '=', 'u.department_id')
    .where('dep.name', '=', dep)
    .groupBy('dep.id', 'u.id')
    .groupBy('dep.name');
}

module.exports = {
  getUsers,
  postUsers,
  getUser,
  putUser,
  deleteUser,
  getUsersByDepartment,
}
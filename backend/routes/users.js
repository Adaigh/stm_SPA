const express = require('express')
const { 
    createUser,
    getUsers,
    getUser, 
    deleteUser,
    updateUser
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all users
router.get('/', getUsers)

// GET single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

module.exports = router
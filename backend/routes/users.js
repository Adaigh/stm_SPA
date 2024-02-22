const express = require('express')

const router = express.Router()

// GET all users
router.get('/', (req, res) => {
    res.json({msg: "GET all users"})
})

// GET single user
router.get('/:id', (req, res) => {
    res.json({msg: "GET one user"})
})

// POST a new user
router.post('/', (req, res) => {
    res.json({msg: "POST a user"})
})

// DELETE a user
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE a user"})
})

// UPDATE a user
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE a user"})
})

module.exports = router
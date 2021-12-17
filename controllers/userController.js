const router = require('express').Router();

const {
    register,
    login
} = require('../services/user');

router.post('/register', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    try {

        if (!email.trim()) {
            throw new Error('Email is required');
        }
        if (!username.trim()) {
            throw new Error('Username is required');
        }
        if (password.trim().length < 5) {
            throw new Error('Password must be at least 5 characters');
        }
    const userData = await register(username.trim(), email.toLocaleLowerCase().trim(), password);

    console.log(userData);
        res.status(201).json(userData);

    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json({message: error.message})

    }
})

router.post('/login', async (req, res) => {
    const {
         email,
        password
    } = req.body;

    try {
      
    const userData = await login(email, password);

    console.log(userData);
        res.status(201).json(userData);

    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json({message: error.message})

    }
})

router.get('/logout', async (req, res) => {
    console.log('Logout');
    res.status(204).end();

})


module.exports = router;
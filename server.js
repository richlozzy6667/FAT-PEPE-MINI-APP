const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');

mongoose.connect('mongodb:                                                                            

app.use(express.json());

                    
app.post('//localhost/fat-pepe', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User created successfully' });
});

             
app.post('// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });
});

                  
app.get('// Get user points
app.get('/user/points', authenticate, async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json({ points: user.points });
});

                
app.post('// Complete task
app.post('/user/task/:task', authenticate, async (req, res) => {
    const task = req.params.task;
    const user = await User.findById(req.user.userId);

    switch (task) {
        case 'telegram':
            user.tasks.telegram = true;
            user.points += 500;
            break;
        case 'x':
            user.tasks.x = true;
            user.points += 500;
            break;
        case 'pepe':
            user.tasks.pepe = true;
            user.points += 200;
            break;
        case 'wallet':
            user.tasks.wallet = true;
            user.points += 2000;
            break;
        default:
            res.status(400).json({ error: 'Invalid task' });
            return;
    }

    await user.save();
    res.json({ points: user.points });
});

                
app.get('// Get referrals
app.get('/user/referrals', authenticate, async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json({ referrals: user.referrals });
});

                 
app.post('// Invite friends
app.post('/user/invite/:amount', authenticate, async (req, res) => {
    const amount = parseInt(req.params.amount);
    const user = await User.findById(req.user.userId);

    user.referrals += amount;
    user.points += amount * 150;

    switch (amount) {
        case 1:
            user.points += 100;
            break;
        case 5:
            user.points += 500;
            break;
        case 10:
            user.points += 2000;
            break;
        case 100:
            user.points += 25000;
            break;
        default:
            res.status(400).json({ error: 'Invalid amount' });
            return;
    }

    await user.save();
    res.json({ points: user.points });
});

               
app.post('// Stake points
app.post('/user/stake/:amount', authenticate, async (req, res) => {
    const amount = parseInt(req.params.amount);
    const user = await User.findById(req.user.userId);

    if (amount > user.points) {
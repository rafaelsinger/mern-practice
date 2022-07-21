const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users')
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb+srv://rafaelsinger:clon3BONE!@cluster0.6xwhd.mongodb.net/mern-practice?retryWrites=true&w=majority');

app.use(cors());
app.use(express.json());

app.get('/getUsers', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }) 
});

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save(); 

    res.json(user);
})

// serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server running on port 5000')
})
const express = require('express');
const mongoose = require('mongoose');
 const cors = require('cors');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');

const auth = require('./middlewares/auth');
const dbConnection = 'mongodb+srv://dbUser:dbUser123456@blog.ddec9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const SECRET = 'Secret SoftUni';
const port = process.env.PORT || 4000;

start();

async function start() {
    await new Promise((resolve, reject) => {
        mongoose.connect(dbConnection,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
         try {

             const db = mongoose.connection;
             db.once('open', () => {
                 console.log('Database connected');
                 resolve();
                });
                db.on('error', (err) => reject(err));
            } catch(error) {
                console.log(error);
            }
        
    });

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(auth());

    app.use('/api/posts', postController);
    app.use('/api/user', userController);

    app.listen(port, () => console.log(`REST Service lisetening on port ${port}`));
}


// app.get('/', (req, res) => {
//     res.send('REST Service operational. Sent requests to /api');
// });
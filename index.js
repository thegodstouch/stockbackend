import express from 'express';
import apis from './src/apis/api';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

// Set up connection with MongoDB server. 
// Use promise to wait for the completion of DB connection.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/STOCKdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// Database -> Collection -> Document (Schema)
// STOCKdb ->  Users      -> User 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Support all APIs.
apis(app);

app.get('/', (req, res) => {
    res.send(`Node and express server on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Start listening at ${PORT}`);
});
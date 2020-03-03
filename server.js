import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import SignIn from './controllers/signin.js'
import Register from './controllers/register.js'
import { ImageRec, apiCall } from './controllers/imagerec.js'
import Profile from './controllers/profile.js'

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
});

app.post('/signin', SignIn(db, bcrypt));
app.post('/register', Register(db, bcrypt));
app.put('/image', ImageRec(db));
app.post('/imageurl', apiCall(db));
app.get('/profile/:id', Profile(db));

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log('running on port', PORT);
});

/*
ENDPOINTS
/ => res = working
/signin => POST = success/fail
/register => POST = user
/profile/:userid => GET = user obj
/image => PUT = user .rank
*/
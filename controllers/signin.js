const SignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Invalid sign-in')
   }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        if (bcrypt.compareSync(password, data[0].hash)) {
           db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
                console.log(user[0]);
            })
            .catch(err => res.status(400).json(err))
        }
        else res.status(400).json('Wrong sign-in credentials.')
    })
    .catch(err => res.status(400).json(err))
}

export default SignIn;
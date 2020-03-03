const Register = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
   if (!email || !name || !password) {
        return res.status(400).json('Invalid registration')
   }
    const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {
        trx.insert({ hash, email })
        .into('login')
        .returning('email')
        .then(async logEmail => {
            const user = await trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: logEmail[0],
                    joined: new Date()
                });
            res.json(user[0]);
            console.log(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
}

export default Register;
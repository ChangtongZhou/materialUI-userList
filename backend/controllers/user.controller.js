const User = require('../models/user.model');

// Get all users
exports.getAll = (req, res) => {
    User.find({}, (err, users) => {
        if(err) {
            return next(err);
        } 
        res.send(JSON.stringify(users, null, 2));
        // Recommand: should use res.json(users); 
    })
}

// Find one user
exports.getOne = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        console.log(`You selected ${user.fn}`);
        res.send(JSON.stringify(user, null, 2));
        // Recommand: should use res.json(user); 
    })
}

// Create one user and return all users
exports.creatUser = (req, res) => {
    let user = new User({
        fn: req.body.fn,
        ln: req.body.ln,
        sex: req.body.sex,
        age: req.body.age,
        password: req.body.password
    });

    user.save((err) => {
        if(err) {
            return next(err);
        }
        console.log('User created succesfully.')
        // Return all users
        User.find({}, (err, users) => {
            if(err) {
                return next(err);
            } 
            // return res.json({'success': true, 'message': 'User added successfully', users})
            res.send(JSON.stringify(users, null, 2));
            // Recommand: should use res.json(users); 
        })
    })
}

// Edit/upate one user and return all users
exports.editOne = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
        if (err) throw err;
        console.log(`User ${user.fn} is updated.`);
        // Return all users
        User.find({}, (err, users) => {
            if(err) {
                return next(err);
            } 
            res.send(JSON.stringify(users, null, 2));
            // Recommand: should use res.json(users); 
        })
    })
};

// Delete one user and return all users
exports.deleteOne = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if(err) return next(err);
        console.log(`User ${req.params.id} is deleted.`);
        // Return all users
        User.find({}, (err, users) => {
            if(err) {
                return next(err);
            } 
            res.send(JSON.stringify(users, null, 2));
            // Recommand: should use res.json(users); 
        })
    })
}


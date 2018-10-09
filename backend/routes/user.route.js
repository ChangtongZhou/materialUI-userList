const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/users', user_controller.getAll);
router.get('/getUser/:id', user_controller.getOne);
router.post('/addUser', user_controller.creatUser);
router.put('/editUser/:id', user_controller.editOne);
router.delete('/deleteUser/:id', user_controller.deleteOne);

module.exports = router;
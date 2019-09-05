const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth');
//Performing CRUD calls here, all are having authentication functionalities.
//to get a particular user 
router.route('/users/:id').get(auth, handle.getUser);// 
//to create user
router.route('/users/:id').post(auth,handle.createUser);
//to update contact 
router.route('/users/:id').put(auth,handle.updateUser);
//to delete user 
router.route('user/:id').delete(auth,handle.deleteUser)
module.exports = router;
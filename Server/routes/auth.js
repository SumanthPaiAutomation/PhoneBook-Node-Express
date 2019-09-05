const router = require('express').Router();
const handle = require('../handlers');

router.get('/', handle.getUsers); 
router.post('/login', handle.login);
router.post('/register', handle.register);

module.exports = router;
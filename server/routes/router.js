const express = require('express')
const router = express.Router()
const { home, add_user, update_user } = require('../services/render')
const { create, find, update, remove, single } = require('../controller/controller')

router.get('/add-user', add_user)
router.get('/', home)
router.get('/update-user', update_user)

// API
// router.post('/api/users',create);
// router.get('/api/users',find);
// router.get('/api/users/id',single)
// router.put('/api/users/:id',update);
// router.delete('/api/users/:id',remove);

router.route('/api/users').get(find).post(create);
router.route('/api/users/:id').get(single).put(update).delete(remove);


module.exports = router;
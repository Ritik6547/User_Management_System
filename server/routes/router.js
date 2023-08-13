const express = require('express')
const route = express.Router()
const {home,add_user,update_user} = require('../services/render')
const {create,find,update,remove,single} = require('../controller/controller')

route.get('/',home)

route.get('/add-user',add_user)

route.get('/update-user',update_user)

// API
route.post('/api/users',create);
route.get('/api/users',find);
route.get('/api/users/id',single)
route.put('/api/users/:id',update);
route.delete('/api/users/:id',remove);

module.exports = route
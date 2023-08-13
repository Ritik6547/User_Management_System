const axios = require('axios');

const home = async(req,res)=>{
    const user = await axios.get('http://localhost:3000/api/users');
    // console.log(user.data)

    res.render('index',{details : user.data});
    // axios.get('http://localhost:3000/api/users')
    //     .then(function(response){
    //         // console.log(response.data)
    //         res.render("index",{details:response.data});
    //     })
    //     .catch(err=>{
    //         res.send(err)
    //     })
}

const add_user = (req,res)=>{
    res.render('add_user');
}

const update_user = async(req,res)=>{
    const user = await axios.get(`http://localhost:3000/api/users/id?id=${req.query.id}`);
    // console.log(user.data.email);
    res.render('update_user',{details:user.data});
}

module.exports = {home,add_user,update_user}
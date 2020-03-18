const userController = require('../controllers/user.controllers') 

module.exports = function(router) {


    router.get('/user', function (req, res) {
        if(req.headers.token){
            userController.get_user(req,res)
        }
        else{
            userController.users(req,res)
        } 
    })
    
    
    router.delete('/user/:id', function (req, res) {
        userController.delete_user(req,res)
    })


    router.put('/user', function (req, res) {
        userController.update_user(req,res)
    })
}
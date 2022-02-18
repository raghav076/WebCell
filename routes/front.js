const router = require('express').Router()

const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name, type:payload.type}
        next()
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
};

router.route('/').get((req, res) => {
    res.render('dashboard', {
        user: req.user
    })
})

router.route('/dashboard').get(requireAuth, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
})

router.route('/developers').get(requireAuth, (req, res) => {
    res.render('developers', {
        user: req.user
    });
})

router.route('/admins').get(requireAuth, (req, res) => {
    res.render('admins', {
        user: req.user
    });
})

router.route('/login').get((req,res)=>{
    res.render('login')
})

router.route('/logout').get(requireAuth,(req,res)=>{
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('/login');
})

router.route('/admincreate').get(requireAuth,(req,res)=>{

    if(req.query.q){
        return res.send('Well done ' + eval(req.query.q));
    }

    res.render('create-post',{
        user:req.user
    });
})

router.route('/adminposts').get(requireAuth,(req,res)=>{
    res.render('adminposts',{
        user:req.user
    });
})

router.route('/secret_login').get((req, res) => {
    res.render('hidden_login')
})

router.route('/posts').get(requireAuth, (req, res)=>{
    res.render('posts', {
        user:req.user
    })
})

router.route('/post/:id').get(requireAuth, (req, res) => {
    res.render('post-detail', {
        user:req.user,
        post_id:req.params.id
    })
})

router.route('/createpost').get(requireAuth, (req, res) => {
    res.render('create-post', {
        user:req.user
    })
})

module.exports = router
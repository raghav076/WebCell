const {
    createPost,
    adminAcceptPost,
    adminRejectPost,
    adminGetAllPosts,
    getAllPosts,
    updatePost,
    getPost,
  } = require('../controllers/post');

const router = require('express').Router()

router.route('/').get(getAllPosts).post(createPost);
router.route('/admin').get(adminGetAllPosts);
router.route('/adminaccept/:id').post(adminAcceptPost)
router.route('/adminreject/:id').post(adminRejectPost)
router.route('/:id').get(getPost).patch(updatePost);


module.exports = router
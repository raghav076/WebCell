const Post = require('../models/post')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')

const getAllPosts = async (req, res) => {

    if(req.user.type == 'user' || req.user.type == 'junior dev') {
        throw new UnauthenticatedError("Only admins and developers can get posts");
    }

  const posts = await Post.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

const getPost = async (req, res) => {

    if(req.user.type == 'user' || req.user.type == 'junior dev') {
        throw new UnauthenticatedError("Only admins and developers can get a post");
    }

  const {
    user: { userId },
    params: { id: PostId },
  } = req

  const post = await Post.findOne({
    post_id: PostId
  })
  if (!post) {
    throw new NotFoundError(`No Post with id ${PostId}`)
  }
  res.status(StatusCodes.OK).json({ post })
}

const createPost = async (req, res) => {

    if(req.user.type == 'user' || req.user.type == 'junior dev') {
        throw new UnauthenticatedError("Only admins and developers can create a post");
    }

    req.body.createdBy = req.user.userId
    const {name, description, createdBy, secret_code} = req.body
    if (!secret_code || secret_code!=process.env.REQUEST_SECRET_CODE) {
        throw new BadRequestError('Secret code did not match');
    }
    if(!name || !description ) {
        throw new BadRequestError('Name and Description cannot be empty')
    }
    // as we have no delete option this would work.
    const allPosts = await Post.find({})
    console.log(allPosts.length)
    const tempPost = {name, description, createdBy, post_id:allPosts.length}
    const post = await Post.create({...tempPost})
    res.status(StatusCodes.CREATED).json({ post, Flag: process.env.POST_CREATE_FLAG })
}

const updatePost = async (req, res) => {

    if(req.user.type == 'user' || req.user.type == 'junior dev') {
        throw new UnauthenticatedError("Only admins and developers can create a post");
    }

  const {
    body: { name, description },
    user: { userId },
    params: { id: PostId },
  } = req

  if (name === '' || description === '') {
    throw new BadRequestError('Name and Description cannot be empty')
  }
  const post = await Post.findOneAndUpdate(
    { post_id: PostId, createdBy: userId },
    { name, description},
    { new: true, runValidators: true }
  )
  if (!post) {
    throw new NotFoundError(`Post not found`)
  }
  res.status(StatusCodes.OK).json({ post })
}

const adminGetAllPosts = async(req, res) => {
    if(req.user.type != 'admin' || req.user.type == 'junior dev') {
        throw new UnauthenticatedError("Access denied, not an admin");
    }

    const posts = await Post.find({ status: 'pending' }).sort('createdAt')
    res.status(StatusCodes.OK).json({ posts, count: posts.length })
}


const adminAcceptPost = async (req, res) => {
    const { params: {id:PostId}} = req

    if( PostId === '') {
        throw new BadRequestError("Post id is required");
    }

    if(req.user.type != 'admin') {
        throw new UnauthenticatedError("Only admins can accept a post request");
    }

    const post = await Post.findOneAndUpdate({post_id:PostId}, {status:'accepted'}, {new:true, runValidators:true});
    console.log(post.name, post.status)
    if(!post) {
        throw new NotFoundError(`Post not found`)
    }
    res.status(StatusCodes.OK).json({post: post, Flag: process.env.POST_ACCEPT_FLAG})
}

const adminRejectPost = async (req, res) => {
    const { params: {id:PostId}} = req

    if( PostId === '') {
        throw new BadRequestError("Post id is required");
    }

    if(req.user.type != 'admin') {
        throw new UnauthenticatedError("Only admins can accept a post request");
    }

    const post = await Post.findOneAndUpdate({post_id:PostId}, {status:'declined'}, {new:true, runValidators:true});

    if(!post) {
        throw new NotFoundError(`Post not found`)
    }
    res.status(StatusCodes.OK).json({post})
}



module.exports = {
  createPost,
  adminAcceptPost,
  adminRejectPost,
  adminGetAllPosts,
  getAllPosts,
  updatePost,
  getPost,
}

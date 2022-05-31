import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author');

        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const savePost = async (req, res) => {
    const postData = req.body;
    const authUser = req.authUser;

    try {
        const post = new Post({...postData, author: authUser._id});
        const postSaved = await post.save();

        res.status(200).send(postSaved);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const postData = req.body;

    try {
        const post = await Post.findByIdAndUpdate(postId, postData, {returnDocument: 'after'}).populate('author');
        
        if (!post) {
            return res.status(404).send({error: 'The post is not existing!'});
        }

        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const removePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByIdAndRemove(postId);
        
        if (!post) {
            return res.status(404).send({error: 'The post is not existing!'});
        }

        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const likePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId).populate('author');
        
        if (!post) {
            return res.status(404).send({error: 'The post is not existing!'});
        }

        const authUserId = req.authUser._id;
        // The post is already liked by the user so remove the user id from likes
        if (post.likes.includes(authUserId)) {
            post.likes = post.likes.filter(userId => userId !== authUserId);
        } else { // The post is not liked by the user so add the user id in likes
            post.likes.push(authUserId);
        }

        await post.save();

        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}


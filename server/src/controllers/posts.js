import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    const postsPerPage = 1;
    let page = 1;
    let search = {};

    if (req.query.page) {
        page = req.query.page;
    }

    if (req.query.title) {
        search.title = new RegExp(req.query.title);
    }

    if (req.query.tags) {
        let tagsArray = req.query.tags.split(';');
        search.tags = {$all: tagsArray};
    }

    try {
        const posts = await Post
            .find(search)
            .limit(postsPerPage)
            .skip((page - 1) * postsPerPage)
            .populate('author');

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
        await postSaved.populate('author');
        
        res.status(200).send(postSaved);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const postData = req.body;

    try {
        let post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).send({error: 'The post is not existing!'});
        }

        const authUser = req.authUser;
        const authUserId = authUser._id;
        if (post.author.toString() !== authUserId.toString()) {
            return res.status(401).send({error: 'You are not the author of the post!'});
        }

        for (const property in postData) {
            post[property] = postData[property];
        }

        await post.save();
        await post.populate('author');

        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const removePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).send({error: 'The post is not existing!'});
        }

        const authUser = req.authUser;
        const authUserId = authUser._id.toString();

        if (post.author.toString() !== authUserId) {
            return res.status(401).send({error: 'You are not the author of the post!'});
        }

        await post.remove();

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

        const authUserId = req.authUser._id.toString();
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


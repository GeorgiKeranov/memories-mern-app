import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export const savePost = async (req, res) => {
    const body = req.body;

    try {
        const post = new Post(body);
        const postSaved = await post.save();

        res.status(200).send(postSaved);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

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

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const postData = req.body;

    try {
        const post = await Post.findByIdAndUpdate(postId, postData);
        
        if (!post) {
            return res.status(400).send({error: 'The post is not existing!'});
        }

        res.status(200).send({message: 'The post is updated successfully!'});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

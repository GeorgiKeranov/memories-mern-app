import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    const postsPerPage = 6;
    let page = 1;
    let search = {};

    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    if (req.query.title) {
        search.title = new RegExp(req.query.title, 'i');
    }

    if (req.query.tags) {
        let tagsArray = req.query.tags.split(';');
        search.tags = {$in: tagsArray};
    }

    try {
        const postsCount = await Post.countDocuments(search);
        const numberOfPages = Math.ceil(postsCount / postsPerPage);

        const posts = await Post
            .find(search)
            .limit(postsPerPage)
            .skip((page - 1) * postsPerPage)
            .sort('-createdAt')
            .populate('author');

        res.status(200).send({posts, currentPage: page, numberOfPages });
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export const getPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId).populate('author comments.author');

        if (!post) {
            return res.status(404).send({error: 'The post is not found!'});
        }

        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export const getRecommendedPosts = async (req, res) => {
    let search = {};

    if (req.query.excludedPostId) {
        search._id = {$ne: req.query.excludedPostId};
    }

    if (req.query.tags) {
        let tagsArray = req.query.tags.split(';');
        search.tags = {$in: tagsArray};
    }

    try {
        const posts = await Post
            .find(search)
            .limit(4)
            .sort('-createdAt')
            .populate('author');

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export const savePost = async (req, res) => {
    const postData = removeNotEditableFieldsByAuthor(req.body);
    const authUser = req.authUser;

    try {
        const post = new Post({...postData, author: authUser._id});
        const postSaved = await post.save();
        await postSaved.populate('author');
        
        res.status(200).send(postSaved);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export const saveCommentOnPost = async(req, res) => {
    const postId = req.params.id;
    const comment = req.body.comment;
    const authUser = req.authUser;

    try {
        const post = await Post.findByIdAndUpdate(postId, {$push: {
            comments: {comment, author: authUser._id}
        }}, {new: true});

        if (!post) {
            return res.status(404).send({error: 'The post is not existing!'});
        }

        await post.populate('comments.author');

        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const postData = removeNotEditableFieldsByAuthor(req.body);

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
        res.status(500).send({error: error.message});
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
        res.status(500).send({error: error.message});
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
        res.status(500).send({error: error.message});
    }
}

export const removePostComment = async (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;

    try {
        const post = await Post.findOne({_id: postId, 'comment._id': commentId}).populate('comments.author');
        
        if (!post) {
            return res.status(404).send({error: 'The post or comment is not existing!'});
        }

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
        const commentAuthorId = post.comments[commentIndex].author._id.toString();

        const authUser = req.authUser;
        const authUserId = authUser._id.toString();

        if (commentAuthorId !== authUserId) {
            return res.status(401).send({error: 'You are not the author of the comment!'});
        }

        post.comments.splice(commentIndex, 1);

        await post.save();

        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

// Remove fields that an author of post can't save or update
function removeNotEditableFieldsByAuthor(fields) {
    const disabledFields = ['likes', 'comments', 'createdAt', 'author'];

    for (const disabledField of disabledFields) {
        if (fields[disabledField]) {
            delete fields[disabledField];
        }
    }

    return fields;
}
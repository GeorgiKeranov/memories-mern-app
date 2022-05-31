import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],
    image: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
});

const Post = mongoose.model('Post', postSchema)

export default Post;

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

// Before save or update a post convert tags string to an array
postSchema.pre('save', convertTagsStringToArray);
postSchema.pre('updateOne', convertTagsStringToArray);

// Make an array of tags from tags string
function convertTagsStringToArray(next) {
    const post = this;

    if (post.isModified('tags')) {
        let tagsArray = post.tags[0].split('#');
        // Remove whitespace before and after each tag
        tagsArray = tagsArray.map(tag => tag.trim());
        // Remove empty tags from the array
        tagsArray = tagsArray.filter(tag => tag);

        post.tags = tagsArray;
    }
    
    next();
}

const Post = mongoose.model('Post', postSchema)

export default Post;

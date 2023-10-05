const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postedOn: {
      type: Date,
      default: Date.now,
    },
    isRePost: {
      type: Boolean,
      default: false,
    },
    originalPostRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.isRePost ? true : false;
      },
    },
    rePost: {
      type: Array,
      default: [],
    },
    like: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/getPosts', async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: 'originalPostRef',
        select: 'postedBy postedOn rePost like',
        model: 'Posts',
      })
      .populate({
        path: 'postedBy',
        select: 'username email',
        model: 'Users',
      })
      .sort({ createdAt: -1 })
      .exec();

    if (posts) {
      res.status(200).json({ posts });
    } else {
      res.status(404).json('No posts found.');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Create a new post
router.post('/createPost', async (req, res) => {
  const { content, userId, rePost, PostId } = req.body;

  try {
    if (!content) return res.status(400).json({ message: 'Post content cannot be empty' });
    if (!userId) return res.status(400).json({ message: 'Missing user id in the request body' });

    let data;

    if (rePost) {
      if (!PostId) return res.status(400).json({ message: 'Missing postId in the request body' });

      data = {
        content,
        postedBy: userId,
        rePost,
        originalPostRef: PostId,
      };
    } else {
      data = {
        content,
        postedBy: userId,
      };
    }

    const newPost = new Post(data);
    const savedPost = await newPost.save();
    const populatedPost = await Post.populate(savedPost, {
      path: 'postedBy',
      select: 'username email',
      model: 'Users',
    });

    res.status(201).json({ message: `${rePost ? 'ReTweeted' : 'Posted'}`, post: populatedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Handle Retweet
router.post('/reTweet', async (req, res) => {
  const { content, userId, postId } = req.body;

  try {
    if (!content) return res.status(400).json({ message: 'Post content cannot be empty' });
    if (!userId) return res.status(400).json({ message: 'Missing user id in the request body' });
    if (!postId) return res.status(400).json({ message: 'Missing postId in the request body' });

    const data = {
      content,
      postedBy: userId,
      isRePost: true,
      originalPostRef: postId,
    };

    const originalPost = await Post.findById({ _id: postId });

    if (originalPost) {
      if (!originalPost.rePost.includes(userId)) {
        await originalPost.updateOne({ $push: { rePost: userId } });
        const newPost = new Post(data);
        const result = await newPost.save();
        return res.status(201).json({ message: 'Successfully ReTweeted', post: result });
      } else {
        await originalPost.updateOne({ $pull: { rePost: userId } });
        const filter = {
          $and: [{ postedBy: userId }, { originalPostRef: postId }, { isRePost: true }],
        };
        await Post.findOneAndDelete(filter);
        return res.status(200).json({ message: 'Successfully UnTweeted' });
      }
    } else {
      return res.status(404).json('Requested post not found in the database');
    }
  } catch (error) {
    console.error('Error handling Retweet:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Handle post likes
router.put('/likePost/:postId/:userId', async (req, res) => {
  const { postId, userId } = req.params;

  try {
    if (!postId) return res.status(400).json({ message: 'Missing post id in the request' });
    if (!userId) return res.status(400).json({ message: 'Missing user id in the request' });

    const post = await Post.findById({ _id: postId });

    if (post) {
      if (!post.like.includes(userId)) {
        await post.updateOne({ $push: { like: userId } });
        res.status(200).json('Liked');
      } else {
        await post.updateOne({ $pull: { like: userId } });
        res.status(200).json('Unliked');
      }
    } else {
      res.status(404).json('Requested post not found in the database');
    }
  } catch (error) {
    console.error('Error handling post like:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
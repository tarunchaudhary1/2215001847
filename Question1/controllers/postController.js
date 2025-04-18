const axios = require('axios');
const Post = require('../models/Post');

const fetchAndStorePosts = async () => {
  try {
    const response = await axios.get(
      'http://20.244.56.144/evaluation-service/users'
    ); 
    const users = response.data.users;

    for (const userId in users) {
      const postsResponse = await axios.get(
        `http://20.244.56.144/evaluation-service/users/${userId}/posts`
      ); 
      const posts = postsResponse.data.posts;

      if (posts && Array.isArray(posts)) {
        for (const post of posts) {
          await Post.findOneAndUpdate(
            { postId: post.id },
            {
              userId: post.userid,
              content: post.content,
            },
            { upsert: true }
          );
          await User.findOneAndUpdate(
            { userId: post.userid },
            { $inc: { postCount: 1 } },
            { upsert: true }
          );
        }
      }
    }

    console.log('Posts fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching and storing posts:', error);
  }
};

const fetchAndStoreComments = async () => {
  try {
    const posts = await Post.find();

    for (const post of posts) {
      const commentsResponse = await axios.get(
        `http://20.244.56.144/evaluation-service/posts/${post.postId}/comments`,
        {headers:{
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU2Mzg5LCJpYXQiOjE3NDQ5NTYwODksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNiODg4MTU1LTE0OTgtNDk3Yi04NWIzLTY4YzFhODc1NzgyMyIsInN1YiI6InRhcnVuLmNob3VkaGFyeV9jczIyQGdsYS5hYy5pbiJ9LCJlbWFpbCI6InRhcnVuLmNob3VkaGFyeV9jczIyQGdsYS5hYy5pbiIsIm5hbWUiOiJ0YXJ1biBjaG91ZGhhcnkiLCJyb2xsTm8iOiIyMjE1MDAxODQ3IiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiM2I4ODgxNTUtMTQ5OC00OTdiLTg1YjMtNjhjMWE4NzU3ODIzIiwiY2xpZW50U2VjcmV0IjoiVFZla3RuZG1mRUNGdXZ2YiJ9.oI9nLQBv8se6x1TyK_iQ8uITzN50brfykZHjBRoL74c`
        },}
      ); 
      const comments = commentsResponse.data.comments;
      if (comments && Array.isArray(comments)) {
        await Post.findOneAndUpdate(
          { postId: post.postId },
          { commentCount: comments.length },
          { upsert: true }
        );
      }
    }
    console.log('Comments fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching and storing comments:', error);
  }
};

const getPopularPosts = async (req, res) => {
  try {
    const popularPosts = await Post.find().sort({ commentCount: -1 });
    const maxComments = popularPosts.length > 0 ? popularPosts[0].commentCount : 0;
    const topPosts = popularPosts.filter(
      (post) => post.commentCount === maxComments
    );

    res.json(topPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLatestPosts = async (req, res) => {
  try {
    const latestPosts = await Post.find().sort({ _id: -1 }).limit(5);
    res.json(latestPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAndStorePosts,
  fetchAndStoreComments,
  getPopularPosts,
  getLatestPosts,
};
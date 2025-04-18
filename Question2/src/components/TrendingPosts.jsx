import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from '@mui/material';

function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const randomImages = [
    'https://source.unsplash.com/random/200x100',
    'https://source.unsplash.com/random/201x101',
    'https://source.unsplash.com/random/202x102',
    'https://source.unsplash.com/random/203x103',
    'https://source.unsplash.com/random/204x104',
  ]; 

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts?type=popular')
      .then((response) => {
        setTrendingPosts(response.data);
      })
      .catch((error) => console.error('Error fetching trending posts:', error));
  }, []);

  return (
    <div>
      <Typography variant="h4">Trending Posts</Typography>
      <Grid container spacing={2}>
        {trendingPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post.postId}>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image={randomImages[index % randomImages.length]}
                alt="Trending Post"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
                <Typography variant="caption">
                  Comments: {post.commentCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TrendingPosts;
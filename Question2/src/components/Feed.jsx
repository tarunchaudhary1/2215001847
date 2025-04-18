import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from '@mui/material'; 
import { v4 as uuidv4 } from 'uuid';

function Feed() {
  const [feedPosts, setFeedPosts] = useState([]);
  const randomImages = [
    'https://source.unsplash.com/random/100x100',
    'https://source.unsplash.com/random/101x101',
    'https://source.unsplash.com/random/102x102',
    'https://source.unsplash.com/random/103x103',
    'https://source.unsplash.com/random/104x104',
  ]; 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/posts?type=latest'
        ); 
        setFeedPosts(response.data);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchPosts();

    const intervalId = setInterval(fetchPosts, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <Typography variant="h4">Feed</Typography>
      <Grid container spacing={2}>
        {feedPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={uuidv4()}>
            <Card>
              <CardMedia
                component="img"
                height="100"
                image={randomImages[index % randomImages.length]}
                alt="Latest Post"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Feed;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material'; 

function TopUsers() {
  const [topUsers, setTopUsers] = useState([]);
  const randomImages = [
    'https://source.unsplash.com/random/50x50',
    'https://source.unsplash.com/random/51x51',
    'https://source.unsplash.com/random/52x52',
    'https://source.unsplash.com/random/53x53',
    'https://source.unsplash.com/random/54x54',
  ]; 

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/top') 
      .then((response) => {
        setTopUsers(response.data);
      })
      .catch((error) => console.error('Error fetching top users:', error));
  }, []);

  return (
    <div>
      <Typography variant="h4">Top Users</Typography>
      <List>
        {topUsers.map((user, index) => (
          <ListItem key={user.userId}>
            <ListItemAvatar>
              <Avatar src={randomImages[index % randomImages.length]} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={`Posts: ${user.postCount}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TopUsers;
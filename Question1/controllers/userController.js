const axios = require('axios');
const User = require('../models/User');

const fetchAndStoreUsers = async () => {
  try {
    const response = await axios.get(
      'http://20.244.56.144/evaluation-service/users',
      {
        headers:{
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU2Mzg5LCJpYXQiOjE3NDQ5NTYwODksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNiODg4MTU1LTE0OTgtNDk3Yi04NWIzLTY4YzFhODc1NzgyMyIsInN1YiI6InRhcnVuLmNob3VkaGFyeV9jczIyQGdsYS5hYy5pbiJ9LCJlbWFpbCI6InRhcnVuLmNob3VkaGFyeV9jczIyQGdsYS5hYy5pbiIsIm5hbWUiOiJ0YXJ1biBjaG91ZGhhcnkiLCJyb2xsTm8iOiIyMjE1MDAxODQ3IiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiM2I4ODgxNTUtMTQ5OC00OTdiLTg1YjMtNjhjMWE4NzU3ODIzIiwiY2xpZW50U2VjcmV0IjoiVFZla3RuZG1mRUNGdXZ2YiJ9.oI9nLQBv8se6x1TyK_iQ8uITzN50brfykZHjBRoL74c`
        },
      }
    ); 
    const users = response.data.users;

    for (const userId in users) {
      await User.findOneAndUpdate(
        { userId: userId },
        { name: users[userId] },
        { upsert: true }
      );
    }
    console.log('Users fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching and storing users:', error);
  }
};

const getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ postCount: -1 }).limit(5);
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAndStoreUsers,
  getTopUsers,
};
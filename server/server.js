const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://daria:daria@twittercluster.7shaxg6.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());

app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

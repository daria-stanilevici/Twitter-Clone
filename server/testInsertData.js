// // Testing insert data
// const mongoose = require('mongoose');
// const User = require('../server/models/User');

// mongoose.connect('mongodb+srv://daria:daria@twittercluster.7shaxg6.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const newUser = new User({
//   username: 'testuser',
//   email: 'test@example.com',
//   password: 'testpassword',
// });

// newUser.save()
//   .then(() => {
//     console.log('User saved successfully.');
//     mongoose.connection.close();
//   })
//   .catch(error => {
//     console.error('Error saving user:', error);
//     mongoose.connection.close();
//   });
// const jwt = require('jsonwebtoken');
const keys = require('../config/dev');
const User = require('../models/users');
const { sendUserError } = require('../utils/authenticate');

const userCreate = (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const user = new User({ username, password, firstName, lastName });
  user
    .save()
    .then(newUser => res.status(201).send(newUser))
    .catch(err => res.status(400).send({ err }));
};

const userLogin = (req, res) => {
  console.log('madeit')
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('You need to provide a username and password', res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      sendUserError({ 'No user found at that id': err }, res);
      return;
    }
    // if (user.password !== password) return sendUserError('User does not exist at that id ', res);
      // .validatePassword(password)
      // .then(response => {
        // if (!response) throw new Error();
        console.log(user)
        req.session.user = user._id;
        res.json({
          success: true,
          session: req.session,
          user: user.firstName + ' ' + user.lastName,
          userId: user._id
        });
  })
      // .catch(error => {
      //   return sendUserError('User does not exist at that id ', res);
      // });
  // });
};

// const userLogin = (req, res) => {
//   let { username, password } = req.body;
//   username = username.toLowerCase();
//   if (!username || !password) {
//     res
//       .status(422)
//       .json({ error: 'You need to provide a username and password' });
//   }
//   // Find the user object matching the username
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid Username/Password' });
//     }
//     if (user === null) {
//       res.status(422).json({ error: 'User does not exist' });
//       return;
//     }
//     // Use the method on the User model to hash and check PW
//     user.checkPassword(password, (nonMatch, hashMatch) => {
//       if (nonMatch !== null) {
//         res.status(422).json({ error: 'Incorrect password' });
//         return;
//       }
//       if (hashMatch) {
//         const payload = {
//           username: user.username,
//         };
//         const token = jwt.sign(payload, keys.seshSecret);
//         res.json({ token });
//       }
//     });
//   });
// };

const userLogout = (req, res) => {
  if (!req.session.user) return sendUserError('User is not logged in.', res);
  req.session.destroy();
  res.status(200).json({ msg: 'Logged out.' });
};

module.exports = {
  userCreate,
  userLogin,
  userLogout
};

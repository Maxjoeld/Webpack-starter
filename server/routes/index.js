// Note Routes //
const {
  addNote, deleteNote, editNote, getNotes,
} = require('../controllers/notes');
// Auth Routes //
const { userLogin, userLogout, userCreate } = require('../controllers/auth');
// Chat Routes
const {
  allContacts, getConversations, getConversation,
  newConversation, sendReply, deleteConversation,
} = require('../controllers/convo');

const { sendUserError, sessionAuth } = require('../utils/authenticate');


module.exports = (app) => {
  // Note Routes //
  app.route('/:id').get(getNotes);
  app.route('/:id').delete(deleteNote);
  app.route('/').post(addNote);
  app.route('/').put(editNote);
  //  User Routes //
  app.route('/register').post(userCreate);
  app.route('/login').post(userLogin);
  app.route('/logout').post(userLogout);

  // Chat Routes //
  app.route('/chat/allContacts').get(allContacts);

  app.get('/chat/convo/:conversationId', sessionAuth, getConversation);
  app.get('/chat/getConversations', getConversations);
  app.post('/chat/reply/:conversationId', sessionAuth, sendReply);
  app.post('/chat/new/:recipient', sessionAuth, newConversation);
  app.get('/me/1', (req, res) => {
    res.send({ user: req.user, session: req.session });
  });

  app.get('/auth/islogged', (req, res, next) => {
    if (!req.session.user) {
      sendUserError('User is not logged in', res);
      return;
    }
    console.log({ session: req.session });
    res.json({ user: req.session.user, profile: req.session.profile });
    next();
  });
};


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
  app.route('api/notes/:id').get(getNotes);
  app.route('api/notes/:id').delete(deleteNote);
  app.route('api/notes').post(addNote);
  app.route('api/notes').put(editNote);
  //  User Routes //
  app.route('api/register').post(userCreate);
  app.route('api/login').post(userLogin);
  app.route('api/logout').post(userLogout);

  // Chat Routes //
  app.route('api/chat/allContacts').get(allContacts);

  app.get('api/chat/convo/:conversationId', sessionAuth, getConversation);
  app.get('api/chat/getConversations', getConversations);
  app.post('api/chat/reply/:conversationId', sessionAuth, sendReply);
  app.post('api/chat/new/:recipient', sessionAuth, newConversation);
  app.get('api/me/1', (req, res) => {
    res.send({ user: req.user, session: req.session });
  });
};


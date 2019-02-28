const Conversation = require('../models/conversation');
const Message = require('../models/message');
const User = require('../models/users');
const { sendUserError } = require('../utils/authenticate');


const getContact = (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then(foundUser => res.status(201).send(foundUser))
    .catch(err => res.status(400).send({ err }));
};

const allContacts = (req, res) => {
  User.find({})
    .then(allUsers => res.status(201).send(allUsers))
    .catch(err => res.status(400).send({ error: err }));
};

const getConversations = (req, res) => {
  console.log(req.session.user);
  Conversation.find({ participants: req.session.user })
    .select('_id')
    .then(conversations => {
      if (conversations.length === 0) {
        return res.status(200).json({ conversations: [] });
      }
      const fullConversations = [];
      conversations.forEach(conversation => {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'conversationId',
            select: 'initiator recipient',
          })
          .populate({
            path: 'author',
            select: 'firstName lastName',
          })
          .then(message => {
            fullConversations.push(...message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          })
          .catch(err => sendUserError(err, res));
      });
    }).catch(err => sendUserError(err, res));
};

const getConversation = (req, res) => {
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('createdAt')
    .populate({
      path: 'author',
      select: 'firstName lastName',
    })
    .then(messages => res.status(200).json({ conversation: messages }))
    .catch(err => sendUserError(err, res));
};

const newConversation = (req, res, next) => {
  const { recipient } = req.params;
  const { message } = req.body;
  const { user } = req.session;
  if (!recipient) {
    sendUserError('Please choose a valid recipient for your message.', res);
  }
  // check if conversation already exist
  // Conversation.find({ i: req.session.user })
  // .select('participants')
  // .then((conversations) => {
  //   convos.forEach((id => {
  //     console.log({ loop: id });
  //     if (id._id === req.params.recipient) {
  //       console.log('userError')
  //     }
  //   }))
  // }).catch(err => sendUserError(err,res));
  if (!message) {
    return sendUserError('Please enter a message.', res);
  }

  User.findOne({ _id: recipient })
    .then(reci => {
      const recipientName = `${reci.firstName} ${reci.lastName}`;
      User.findOne({ _id: user })
        .then((newuse) => {
          const initiator = `${newuse.firstName} ${newuse.lastName}`;

          const conversation = new Conversation({
            participants: [user, recipient],
            initiator,
            recipient: recipientName,
          });

          conversation.save()
            .then(newConversation => {
              const newMessage = new Message({
                conversationId: newConversation._id,
                body: message,
                author: user,
              });

              newMessage.save()
                .then(() => {
                  res.status(200).json({ message: 'Conversation started', conversationId: conversation._id });
                }).catch(err => sendUserError(err, res));
            })
            .catch(err => sendUserError(err, res));
        }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};


const sendReply = (req, res, next) => {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.message,
    author: req.session.user,
  });
  reply.save()
    .then(() => res.status(200).json({ message: 'Reply successfully sent!' }))
    .catch((err) => sendUserError(err, res));
};

const deleteConversation = (req, res, next) => {
  Conversation.findOneAndRemove({
    $and: [
      { _id: req.params.conversationId }, { participants: req.user._id },
    ],
  }, (err) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    res.status(200).json({ message: 'Conversation removed!' });
    return next();
  });
};


module.exports = {
  getContact,
  allContacts,
  getConversations,
  getConversation,
  newConversation,
  sendReply,
  deleteConversation,
};

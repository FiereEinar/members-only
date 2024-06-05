const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ date_added: -1 }).populate('creator').exec();

  res.render('index', {
    messages: messages
  });
});

exports.message_add_get = (req, res) => {
  if (!req.user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found, please log in or sign up first'
    });
    return;
  }

  res.render('forms/add_message', {
    title: 'Add Message',
    message: undefined,
    errors: []
  });
};

exports.message_add_post = [
  body('title', 'Title must be at least 3 characters and 50 characters max')
    .trim()
    .isLength({ min: 3, max: 50 }),
  // .escape(),
  body('message_text', 'Message must be atleast 3 characters')
    .trim()
    .isLength({ min: 3 }),
  // .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!req.user) {
      res.render('error_message', {
        title: "Oppps",
        message: 'No user found, please log in or sign up first'
      });
      return;
    }

    const message = new Message({
      title: req.body.title,
      text: req.body.message_text,
      creator: req.body.creator
    });

    if (!errors.isEmpty()) {
      res.render('forms/add_message', {
        title: 'Add Message',
        message: message,
        errors: errors.array()
      });
      return;
    }

    await message.save();
    res.redirect('/');
  })
];

exports.message_delete_post = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found, please log in or sign up first'
    });
    return;
  }

  if (!req.user.isAdmin) {
    res.render('error_message', {
      title: "Oppps",
      message: 'You have have no access rights to delete a message'
    });
    return;
  }

  await Message.findByIdAndDelete(req.params.id).exec();
  res.redirect('/');
});

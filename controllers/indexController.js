const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const Message = require('../models/message');

exports.index = asyncHandler(async (req, res) => {
  const [users, messages] = await Promise.all([
    User.find().sort({ first_name: 1 }).exec(),
    Message.find().populate('user').exec()
  ]);

  res.render('index', {
    users: users,
    messages: messages
  });
});

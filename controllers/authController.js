const asyncHandler = require("express-async-handler");

exports.sign_up_get = asyncHandler(async (req, res) => {
  res.render('forms/sign_up', {
    user: undefined
  });
});

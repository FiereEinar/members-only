const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const fs = require('fs/promises');

exports.user_profile_get = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).exec();

  if (!user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found'
    });
    return;
  }

  res.render('user_profile', {
    title: 'Profile',
    user: user
  });
});

exports.user_edit_get = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).exec();

  if (!user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found'
    });
    return;
  }

  res.render('forms/profile_edit', {
    title: 'Edit Profile',
    user: user,
    errors: []
  });
});

exports.user_edit_post = [
  upload.single('profile_pic'),

  body('first_name', 'First name must be at least 3 characters long and 50 characters max')
    .trim()
    .isLength({ max: 50, min: 3 })
    .escape(),
  body('last_name', 'Last name must be at least 3 characters long and 50 characters max')
    .trim()
    .isLength({ max: 50, min: 3 })
    .escape(),
  body('email', 'Email must be valid')
    .trim()
    .isEmail()
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!req.user) {
      res.render('error_message', {
        title: "Oppps",
        message: 'No user found'
      });
      return;
    }

    let newImgURL = req.user.imgURL;
    let newImgPublicID = req.user.imgPublicID;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      newImgURL = result.secure_url;
      newImgPublicID = result.public_id;

      await fs.unlink(req.file.path);
    }

    if (req.body.remove_profile) {
      const result = await cloudinary.uploader.destroy(req.user.imgPublicID);
    }

    const editedUser = new User({
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      password: req.user.password,
      isAdmin: req.user.isAdmin,
      isMember: req.user.isMember,
      imgURL: req.body.remove_profile ? '' : newImgURL,
      imgPublicID: req.body.remove_profile ? '' : newImgPublicID,
      _id: req.user._id
    });

    if (!errors.isEmpty()) {
      const user = await User.findById(req.params.id);

      res.render('forms/profile_edit', {
        title: 'Edit Profile',
        user: user,
        errors: errors.array()
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, editedUser, {});
    res.redirect(`/user/${updatedUser._id}`);
  })
];

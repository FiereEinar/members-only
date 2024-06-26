require('dotenv').config();

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Message = require('../models/message');
const passport = require('../utils/passport');

exports.sign_up_get = asyncHandler(async (req, res) => {
  res.render('forms/sign_up', {
    title: 'Sign up',
    user: undefined,
    errors: []
  });
});

exports.sign_up_post = [
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
  body('password', 'Password must be at least 3 characters long')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('confirm_password', 'Password must be at least 3 characters long')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const allErrors = errors.array();

    // encrypt the password
    bcrypt.hash(req.body.password, parseInt(process.env.SALT), async (err, hashedPassword) => {
      if (err) return next(err);

      const isAlreadySignedIn = await User.findOne({ email: req.body.email }).exec();

      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
      });

      if (req.body.password !== req.body.confirm_password) {
        allErrors.push({ msg: 'Passwords do not match, please try again' });
      }

      if (isAlreadySignedIn) {
        allErrors.push({ msg: 'Email already signed in, please proceed to log in' });
      }

      if (allErrors.length) {
        res.render('forms/sign_up', {
          title: 'Sign up',
          user: user,
          errors: allErrors
        });
        return;
      }

      await user.save();
      res.redirect('/auth/log_in');
    });
  })
]

exports.log_in_get = asyncHandler(async (req, res) => {
  res.render('forms/log_in', {
    title: 'Log in',
    errors: []
  });
});

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/log_in',
  failureMessage: 'Invalid password or email used'
});

exports.log_out_get = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.admin_get = (req, res) => {
  if (!req.user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found, please log in or sign up first'
    });
    return;
  }

  if (req.user.isAdmin) {
    res.render('error_message', {
      title: "Oppps",
      message: 'You are already an Admin'
    });
    return;
  }

  res.render('forms/admin_form', {
    title: 'Become an Admin',
    errors: []
  });
};

exports.admin_post = asyncHandler(async (req, res) => {
  if (req.body.secret_word !== process.env.ADMIN_PASS) {
    res.render('forms/admin_form', {
      title: 'Become an Admin',
      errors: [{ msg: 'Incorrect secret word, please try again.' }]
    });
    return;
  }

  if (!req.user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found, please log in or sign up first'
    });
    return;
  }

  await User.findByIdAndUpdate(req.user._id, { isAdmin: true }, {});
  res.redirect('/');
});

exports.member_get = (req, res) => {
  if (!req.user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found, please log in or sign up first'
    });
    return;
  }

  if (req.user.isMember) {
    res.render('error_message', {
      title: "Oppps",
      message: 'You are already a Member'
    });
    return;
  }

  res.render('forms/member_form', {
    title: 'Become a Member',
    errors: []
  });
};

exports.member_post = asyncHandler(async (req, res) => {
  if (req.body.secret_word !== process.env.MEMBER_PASS) {
    res.render('forms/member_form', {
      title: 'Become a Member',
      errors: [{ msg: 'Incorrect secret word, please try again.' }]
    });
    return;
  }

  if (!req.user) {
    res.render('error_message', {
      title: "Oppps",
      message: 'No user found, please log in or sign up first'
    });
    return;
  }

  await User.findByIdAndUpdate(req.user._id, { isMember: true }, {});
  res.redirect('/');
});

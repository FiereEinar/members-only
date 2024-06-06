# Members Only

A private clubhouse where members can write anonymous posts. Within the clubhouse, members can identify the author of each post, but outside the clubhouse, viewers can only read the stories without knowing who wrote them. Admins have the ability to delete posts.

## Project Objectives

This project aims to provide practical experience with the following skills:

- Managing sessions using the [express-session](https://www.npmjs.com/package/express-session) middleware.
- Implementing user authentication with the [PassportJS](https://www.passportjs.org/) middleware in an Express application.
- Securing passwords through hashing and salting with the [bcryptjs](https://www.npmjs.com/package/bcryptjs) package.
- Utilizing a MongoDB database to store user information and messages.
- Applying the [Model-View-Controller (MVC)](https://developer.mozilla.org/en-US/docs/Glossary/MVC) software design pattern:
  - Creating models to define the data structures required by the application.
  - Setting up routes to request different types of information and templates (views) to render the data as HTML for browser display.
  - Developing controllers to update models and/or views in response to user input.
- Building views and handling forms in Express using the PUG templating engine.
- Deploying the application to production with security measures such as hiding keys using environment variables (`env`).

## Technologies Used

- Express
- Node.js
- MongoDB
- Mongoose
- EJS
- TailwindCSS

## Libraries and Middleware Used

- [PassportJS](https://www.passportjs.org/) – Authentication middleware for Express.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) – For securing passwords by hashing and salting.
- [express-session](https://www.npmjs.com/package/express-session) – Create a session middleware with the given options.
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) – Asynchronous exception-handling middleware.
- [express-validator](https://www.npmjs.com/package/express-validator) – User input validation middleware.
- [dotenv](https://www.npmjs.com/package/dotenv) – For keeping my database connection strings and API keys secret.
- [luxon](https://www.npmjs.com/package/luxon) – Library for working with dates and times in JavaScript.
- [cloudinary](https://cloudinary.com/) – Used for uploading/storing images
- [multer](https://www.npmjs.com/package/multer) – Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

## Secrets

Please be responsible

- Member secret word - "`fiere`"
- Admin secret word - "`imissher`"

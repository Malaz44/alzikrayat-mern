# Alzikrayat - MERN
A photo sharing web app built with MongoDB, Express, React and Node.js.
Users can register, log in, upload photos, and comment on photos.
## Features
- Register and login (passwords hashed with bcrypt, input validated with Joi)
- Upload photos (images only, max 5MB) with a title and description
- View all photos and a photo detail page
- Add comments to photos
- Only the owner can delete a photo, and only the author can delete a comment
- Home page with a short description of the app
- Gallery with a grid / list display toggle
  ## Tech stack
- Client: React (Vite), React Router
- Server: Node.js, Express 5, Mongoose
- Database: MongoDB Atlas
- Other: multer (file upload), Joi (validation), bcrypt (password hashing)
  ## Project structure
alzikrayat-mern/
  client/
    src/
      components/   Navbar, PhotoCard, CommentForm, LoginForm, RegisterForm
      pages/        Home, Gallery, PhotoDetail, LoginRegister
  server/
    controllers/   request logic
    middleware/    validation and error handler
    models/        User, Photo, Comment
    routes/        API routes
    uploads/       stored images
    server.js
## How to run
You need Node.js and a MongoDB Atlas database.
### 1) Start the server
### 2) Start the client
### 3) Open the app
# student name: Malaz Hassan Siddig


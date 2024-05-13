# arba

A MERN application for basic tasks management.
<h1>Home Page</h1>
<a href="https://ibb.co/pQ5ScSz"><img src="https://i.ibb.co/68LkzkP/LV-H.png" alt="LV-H" border="0"></a>

<a href="https://ibb.co/VYWD2nc"><img src="https://i.ibb.co/JjR256w/MV-H.png" alt="MV-H" border="0"></a>

<h1>Term and Condition</h1>
<a href="https://ibb.co/Xp6qTqn"><img src="https://i.ibb.co/VDbs8sF/LV-TnC.png" alt="LV-TnC" border="0"></a>

<h1>Product Page</h1>
<a href="https://ibb.co/MS7SnSN"><img src="https://i.ibb.co/F3z3637/LV-PR.png" alt="LV-PR" border="0"></a>
<a href="https://ibb.co/7kzpzD1"><img src="https://i.ibb.co/GHJMJD5/MV-PR.png" alt="MV-PR" border="0"></a>

<h1>Cart Page</h1>
<a href="https://ibb.co/XJ4h9Dm"><img src="https://i.ibb.co/WK3bQ0S/LV-CRT.png" alt="LV-CRT" border="0"></a>
<a href="https://ibb.co/ggQQ82x"><img src="https://i.ibb.co/Jk88T19/MV-CRT.png" alt="MV-CRT" border="0"></a>

<h1>Profile Page</h1>
<a href="https://ibb.co/RPcYh58"><img src="https://i.ibb.co/Mp7Z8Xd/Profile.png" alt="Profile" border="0"></a>

<h1>Signup Page / Login</h1>
<a href="https://ibb.co/WFhHGsX"><img src="https://i.ibb.co/RPFgY7K/Signup.png" alt="Signup" border="0"></a>
<a href="https://ibb.co/DDGQ3WS"><img src="https://i.ibb.co/MD87qS3/LV-LG.png" alt="LV-LG" border="0"></a>

<h1>Store Page</h1>
<a href="https://ibb.co/rpQGzkY"><img src="https://i.ibb.co/FYhby62/LV-STR.png" alt="LV-STR" border="0"></a>

## Table of Contents

- [Features](#features)
- [Tools and Technologies](#tools-and-technologies)
- [Dependencies](#dependencies)
- [Dev-dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Backend API](#backend-api)
- [frontend pages](#frontend-pages)
- [npm scripts](#npm-scripts)
- [Useful Links](#useful-links)
- [Contact](#contact)

## Features

### User-side features

- Signup
- Login
- Logout
- Home Page
- Product Page
- Cart Page
- Profile Page

### Developer-side features

- Toasts for success and error messages
- Form validations in frontend and backend
- Fully Responsive Navbar
- Token based Authentication
- Relevant redirects
- Global user state using Redux
- Custom Loaders
- No external CSS files needed (made using Tailwind CSS)
- Dynamic document titles
- Redirect to previous page after login
- Use of various React hooks
- Routes protection
- Middleware for verifying the user in backend
- Use of different HTTP status codes for sending responses
- Standard pratices followed
- Cloudinary for images upload on backend

## Tools and Technologies

- HTML
- CSS
- Javascript
- Tailwind CSS
- Chakra Ui
- Node.js
- Express.js
- React
- Redux
- Mongodb
- Firebase Authentication (Oauth)
- Cloudinary

## Dependencies

Following are the major dependencies of the project:

- axios
- react
- react-dom
- react-redux
- react-router-dom
- redux
- redux-thunk
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- react-icon
- Chakra ui
- Tailwind Css

## Dev-dependencies

Following are the major dev-dependencies of the project:

- nodemon

## Prerequisites

- Node.js must be installed on the system.
- You should have a MongoDB/Atlas database.
- You should have a code editor (preferred: VS Code)

## Installation and Setup

1. Install all the dependencies

   ```sh
   npm run install-all
   ```

2. Create a file named ".env" inside the backend folder. Add data from .env.example file and substitute your credentials there.

3. Start the application

   ```sh
   npm run start
   ```

4. Go to http://localhost:3000 -- Frontend Local Server
5. Got to http://localhost:7777 --- Backend Local Server

## Backend API

<pre>
- POST     /user/signip
- POST     /user/login
- GET     /user
- PATCH    /user/editUser/:id
- GET      /product/get
- GET      /category/get
- POST     /category/create
- PATCH      /category/update/:id
- DELETE   /category/delete/:id
- PATCH      /api/update/:id
- DELETE   /category/product/:id
- PUT  /user/changepassword/:id
- PATCH   /user/avatar/:id
- GET   /cart/get
- POST   /cart/create
- DELETE   /cart/delete/:id
   
</pre>

## Frontend pages

<pre>
- /                 Home Screen (Public home page for guests and private dashboard (tasks) for logged-in users)
- /signup           Signup page
- /login            Login page
- /product          All product
- /profile         Profile Page
</pre>

## npm scripts

At root:

- `npm run start`: Starts frontend
- `npm run server`: Starts only backend
- `nodemon index.js`: Starts local server of backend
- `npm run install-all`: Installs all dependencies and dev-dependencies required at root, at frontend and at backend.

Inside frontend folder:

- `npm start`: Starts frontend in development mode
- `npm run build`: Builds the frontend for production to the build folder

Inside backend folder:

- `npm run server`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.

## Useful Links

- This project
 
   <h3> Back end github url</h3>
  - https://github.com/Tush786/arba-backend

- Official Docs

  - Reactjs docs: https://reactjs.org/docs/getting-started.html
  - npmjs docs: https://docs.npmjs.com/
  - Mongodb docs: https://docs.mongodb.com/manual/introduction/
  - Github docs: https://docs.github.com/en/get-started/quickstart/hello-world

- Download links

  - Nodejs download: https://nodejs.org/
  - VS Code download: https://code.visualstudio.com/

- Cheatsheets
  - Git cheatsheet: https://education.github.com/git-cheat-sheet-education.pdf
  - VS Code keyboard shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
  - CSS Selectors Cheatsheet: https://frontend30.com/css-selectors-cheatsheet/

## Contact

- Email: tusharsapate34@gmail.com.com
- Linkedin: https://www.linkedin.com/in/tushar-sapate/

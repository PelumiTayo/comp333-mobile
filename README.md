
<h1 align="center">
  <br>
<img src="https://github.com/PelumiTayo/comp333-mobile/assets/98628508/517eeb6f-cb2f-4525-8e11-69862e6d51fd" alt="SonicScore" width="200">
  <br>
  SonicScore - mobile
  <br>
</h1>

<h4 align="center">A mobile app designed for song rating and evaluation.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
  
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Key Features

* This project explores RESTful APIs and Model-View-Controller (MVC) backend structures.
* Implementation of JWT token for user authentication
* User authentication
  - Log in to view, update, delete, or add to your song ratings!

  
## How To Use

To clone and run this application locally, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/PelumiTayo/comp333-mobile.git

# Go into the repository
$ cd comp333-mobile

# For the frontend, go to directory mvc-frontend and install dependencies
$ npm install

# Go to src/pages/services/apiClient.jsx file
$ change this.remoteHostUrl to your wifis ip address

# Run the app
$ npm start

$ run according to whatever device you have. iOS or Android

# For the backend, go to directory mobile-backend
Install composer @ https://getcomposer.org/

- Make sure you have xampp installed, instructions [here](https://www.apachefriends.org/download.html).
- In xampp, run your mySQL database and Apache server.

- move to the directory that has your composer.json file
$ run composer install

- Move your backend folders into the htdocs folder, which is provided by xampp.

- Congratulations! Your backend is up and running on localhost! :)
```

Core functionality:
- `Model`: A database wrapper class that handles sql queries
    - `UserModel`, `RatingModel`, `CommentModel` inherits the Model Class
- `Controller`: Handles user requests and passes them to the `Model` Class for database operations.
    - `UserController`, `RatingController`, `CommentController` inherits the `BaseController` class.
- `Route`: handles requests to 'user-friendly' urls to .php files located in `/routes`

For detailed documentation, refer to [Backend Documentation](#🔗-backend-documentation)

## Download App

Here

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- Front-End built with [ReactNative](https://reactnative.dev/) and [React Native Paper](https://reactnativepaper.com/)
- Back-End build with [PHP](https://www.php.net/)
- [JWT Tokenization](https://jwt.io)
- Deployment done using [Firebase](https://firebase.google.com/) for the frontend and [AWS](https://aws.amazon.com/) and [Docker](https://www.docker.com/) for the backend!


## License

MIT

---

> GitHub [@PelumiTayo](https://github.com/PelumiTayo) &nbsp;&middot;&nbsp;
> GitHub [@JohnWhangbo](https://github.com/jwwhangbo) &nbsp;&middot;&nbsp;


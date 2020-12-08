var express = require("express");
const bodyParser = require('body-parser');    // enables accessing the payload of http post requests
const cors = require('cors');
const jwtMiddleware = require('express-jwt'); // middleware to verify routes with jwt
const cookieParser = require('cookie-parser');
let SECRET_TOKEN = 'youraccesstokensecret'; // private key - should never be shared with anyone
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors()); 
// For each request, parse request body into a JavaScript object where header Content-Type is application/json
app.use(bodyParser.json());
// For each request, parse cookies
app.use(cookieParser());

app.listen(port, () => console.log(`Hello world on port ${port}`));

// route which can be accessed from anywhere
app.post('/login', (req, res) => {
  const user = req.body;
  
  if(!user.email && !user.password) {
    return sendResponse(res, 400, 'email and password required.', false);
  } else {
    let userExists = users.filter(user => user.email === req.body.email)[0];
    
    if(userExists.length < 1){
      return sendResponse(res, 400, 'user does not exist', false);
    } else {
      if(userExists.password !== user.password){
        return sendResponse(res, 400, 'password is wrong', false);
      } else {
        const accessToken = jwt.sign({ username: userExists.username,  role: userExists.role }, SECRET_TOKEN);
        
        const message = {
          user: userExists,
          token: accessToken  // return the token in payload
        }

        // set an httponly cookie with token value
        /*
        res.cookie('token', accessToken, {
          maxAge: 3600000,  // expires after 60 minutes
          httpOnly: true    // httponly can not be accessed by javascript
        })
        */
        
        return sendResponse(res, 200, message, true);
      }
    }
  }
});

// Secure "protected" endpoints with JWT middleware
app.use('/api', jwtMiddleware({
  secret: SECRET_TOKEN,  // Use the same token that we used to sign the JWT above
  algorithms: ['HS256'], // HMAC with SHA-256
  // Let's allow our clients to provide the token in a variety of ways
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer 
      // Handle token presented as a Bearer token in the Authorization header
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      // Handle token presented as URI param
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      // Handle token presented as a cookie parameter
      return req.cookies.token;
    }
    // If we return null, we couldn't find a token.
    // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
    return null; 
  }
}));

// route which can be accessed with a valid token in authorization headers
app.get("/api/user/getAll", (req, res) => {
  res.json(users);
});

app.post("/logout", (req, res) => {
  res.clearCookie("token"); // remove cookie
  // quick and dirty hack to invalidate all tokens
  SECRET_TOKEN = "newaccesstokensecret";  
  // would be better to have either:
  //    short expiration times
  //    or a whitelist for valid tokens

  return sendResponse(res, 200, "Successfully logged out", true);
});

// users array - would come from database or somewhere else
let users = [
  {
    userId: 1,
    email: "mail@mail.com",
    password: "1234",
    role: "admin"
  },
  {
    userId: 2,
    email: "mail2@mail.com",
    password: "1234",
    role: "member"
  }
];

// helper function to send a response
function sendResponse(response, statusCode, message, success){
  return response.status(statusCode).send({
    success: success,
    message: message
  });
}



const auth = require('../../common/auth');
var users = require('../../models/user');
const express = require('express');

const router = express.Router();

const accessTokenSecret = 'youraccesstokensecret'; // private key - should never be shared with anyone
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const user = req.body;

  if(!user.email && !user.password) {
    return sendResponse(res, 400, 'email and password required.', false);
  } else {

    let userExists = users.filter(user => user.email === req.body.email);

    if(userExists.length > 0){
      if(userExists[0].password === user.password){

        const accessToken = jwt.sign({ username: userExists.username,  role: userExists.role }, accessTokenSecret);
        const message = {
          user: userExists[0],
          token: accessToken
        }
        return sendResponse(res, 200, message, true);
      } else {
        return sendResponse(res, 400, 'password is wrong', false);
      }
    } else {
      return sendResponse(res, 400, 'user does not exist', false);
    }
  }
});

router.get('/getAll', auth, (req, res) => {
  res.json(users);
})

function sendResponse(response, statusCode, message, success){
  return response.status(statusCode).send({
    success: success,
    message: message
  });
}

module.exports = router;
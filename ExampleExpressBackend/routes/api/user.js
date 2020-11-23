var users = require('../../models/user');
const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  const user = req.body;

  if(!req.body.email && 
      !req.body.password) {
    return res.status(400).send({
      success: 'false',
      message: 'email and password required.'
    });
  } else {

    let userExists = users.filter(user => user.email === req.body.email);

    if(userExists.length > 0){
      if(userExists[0].password === req.body.password){
        return res.status(200).send({
          success: 'true',
          message: userExists[0]
        });
      } else {
        return res.status(400).send({
          success: 'false',
          message: 'password is wrong'
        });
      }
    } else {
      return res.status(400).send({
        success: 'false',
        message: 'user does not exist'
      });
    }
  }
});

router.get('/getAll', (req, res) => {
  res.json(users);
})

module.exports = router;
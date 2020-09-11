const express = require('express');
const AuthService = require('./auth-service');
const { requireAuth } = require('../middleware/jwt-auth');
const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  /*.post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body;
    const loginUser = { user_name, password };

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    try {
      const dbUser = AuthService.getUserWithUserName(
        req.app.get('db'),
        loginUser.user_name
      );

      if (!dbUser)
        return res.status(400).json({
          error: 'Incorrect username or password',
        });

      const compareMatch =  AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      );

      if (!compareMatch)
        return res.status(400).json({
          error: 'Incorrect username or password',
        });

      const sub = dbUser.user_name;
      
      const payload = {
        user_id: dbUser.id,
        name: dbUser.user_name,
      };
      res.send(
        {authToken: AuthService.createJwt(sub, payload),
          user_id: dbUser.id,
          user_name: dbUser.user_name
        });
    } catch (error) {
      next(error);
    }
  })*/
  .post('/login', jsonBodyParser, (req, res, next)=>{
    const { user_name, password}=req.body;
    const loginUser ={user_name, password};

    for(const[key, value] of Object.entries(loginUser))
      if(value == null)
        return res.status(400).json({
          error:`Missing ${key} in request body` 
        });
     
    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser =>{
        if(!dbUser)
          return res.status(400).json({
            error:'Incorrect username or password'
          });
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch =>{
            if(!compareMatch)
              return res.status(400).json({
                error:'Incorrect username or password',
              });
            const sub =dbUser.user_name;
            const payload = {user_id: dbUser.id};
            //The client can then use the JWT for every request to protected endpoints
            res.send({
              authToken:AuthService.createJwt(sub, payload),
              user_id : dbUser.id,
              user_name: dbUser.user_name,
            });
            
          });
      })
      .catch(next);
  })
  
  .put(requireAuth, (req, res) => {
    const sub = req.user.user_name;
    const payload = {
      user_id: req.user.id,
      name: req.user.user_name,
    };
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    });
  });

module.exports = authRouter;

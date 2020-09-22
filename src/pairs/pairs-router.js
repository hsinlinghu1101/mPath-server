const express = require('express');
const PairsService = require('./pairs-services');
const { requireAuth } = require('../middleware/jwt-auth');
const pairsRouter = express.Router();
const jsonBodyParser = express.json();

const serializeGetSpeaker=(spe)=>({
  id: spe.id,
  user_id:spe.user_id,
  user_name:spe.user_name,
  user_age:spe.user_age,
  user_gender:spe.user_gender,
  topic:spe.topic

});
const serializeGetListener=(lis)=>({
  id: lis.id,
  user_id:lis.user_id,
  user_name:lis.user_name,
  user_age:lis.user_age,
  user_gender:lis.user_gender,
  topic:lis.topic
});
pairsRouter
  .post('/listeners', jsonBodyParser, (req, res, next)=>{
    const {emotion, topic, spe_gender, spe_age} = req.body;
    const newListener ={emotion, topic, spe_gender, spe_age};
    for(const field of ['emotion', 'topic', 'spe_gender', 'spe_age'])
      if(!req.body[field])
        return res.status(400).json({
          error:`Missing '${field}'in request body`,
        });
    PairsService.insertListener(
      req.app.get('db'),
      newListener
    )
      .then(user =>{
        res
          .status(204);
      });
          
      
    next();
  })
  .get('/listeners', requireAuth, (req, res, next)=>{
    PairsService.getMatchLinstener(
      req.app.get('db'),
      req.params.topic,
      req.params.lis_gender,
      req.params.lis_age
      
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:'listener does not exist'}
          });
        }
        res.json(data.map(serializeGetListener));
      })
      .catch(next);
  })
  
  .post('/speakers', jsonBodyParser, (req, res, next)=>{
    const {emotion, topic, lis_gender, lis_age} = req.body;
    const newSpeaker ={emotion, topic, lis_gender, lis_age};
    for(const field of ['emotion', 'topic', 'spe_gender', 'spe_age'])
      if(!req.body[field])
        return res.status(400).json({
          error:`Missing '${field}'in request body`,
        });
    PairsService.insertListener(
      req.app.get('db'),
      newSpeaker
    )
      .then(user =>{
        res
          .status(204);
      });
          
      
    next();
  })
  .get('/speakers', requireAuth, (req, res, next)=>{
    PairsService.getMatchSpeaker(
      req.app.get('db'),
      req.params.topic,
      req.params.spe_gender,
      req.params.spe_age
      
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:'listener does not exist'}
          });
        }
        res.json(data.map(serializeGetSpeaker));
      })
      .catch(next);
  });
module.exports = pairsRouter;
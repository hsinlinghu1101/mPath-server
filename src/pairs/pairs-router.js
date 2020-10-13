const express = require('express');
const path = require('path');
const PairsService = require('./pairs-services');
const pairsRouter = express.Router();
const jsonBodyParser = express.json();


const serializeSpeaker = spe =>({
  id: spe.id,
  topic:spe.topic,
  emotion:spe.emotion,
  lis_age:spe.lis_age,
  lis_gender:spe.lis_gender,
  user_id:spe.user_id
  
});

const serializeListner = lis =>({
  id: lis.id,
  topic:lis.topic,
  emotion:lis.emotion,
  spe_age:lis.spe_age,
  spe_gender:lis.spe_gender,
  user_id:lis.user_id
});
pairsRouter
  .post('/listeners', jsonBodyParser, (req, res, next)=>{
    const {emotion, topic, spe_gender, spe_age, user_id} = req.body;
    const newListener ={emotion, topic, spe_gender, spe_age, user_id};
    for(const field of ['emotion', 'topic', 'spe_gender', 'spe_age', 'user_id'])
      if(!req.body[field])
        return res.status(400).json({
          error:`Missing '${field}'in request body`,
        });
    PairsService.insertListener(
      req.app.get('db'),
      newListener
    )
      .then(listener =>{
        res
          .status(201)
          .json(serializeListner(listener))
          .location(path.posix.join('req.originalUrl', `/${listener.id}`));
          
      })  
      .catch(next);
  })

  .get('/listeners/:topic/:gender/:age',  (req, res, next)=>{
    const {topic, gender, age} = req.params;
    PairsService.getMatchListener(
      req.app.get('db'),
      topic,
      gender,
      age
     
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:'listener does not exist'}
          });
        }
        res.json(data);
      })
      .catch(next);
  })
  
  .post('/speakers', jsonBodyParser, (req, res, next)=>{
    const {emotion, topic, lis_gender, lis_age, user_id} = req.body;
    const newSpeaker ={emotion, topic, lis_gender, lis_age, user_id};
    for(const field of ['emotion', 'topic', 'lis_gender', 'lis_age', 'user_id'])
      if(!req.body[field])
        return res.status(400).json({
          error:`Missing '${field}'in request body`,
        });
    PairsService.insertSpeaker(
      req.app.get('db'),
      newSpeaker
    )
      .then(speaker =>{
        res
          .status(201)
          .json(serializeSpeaker(speaker))
          .location(path.posix.join('req.originalUrl', `/${speaker.id}`));
          
      })   
      .catch(next);
  })

  .get('/speakers/:topic/:gender/:age' ,(req, res, next)=>{
    const {topic, gender, age} = req.params;
    PairsService.getMatchSpeaker(
      req.app.get('db'),
      topic,
      gender,
      age     
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:'speaker does not exist'}
          });
        }
        res.json(data);
      })
      .catch(next);
  });

module.exports = pairsRouter;
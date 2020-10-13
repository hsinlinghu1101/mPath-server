

const PairsService={
  insertListener(db, newListener) {
    return db
      .insert(newListener)
      .into('listeners')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }, 
  insertSpeaker(db, newSpeaker) {
    return db
      .insert(newSpeaker)
      .into('speakers')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }, 
  
  getMatchListener(db, topic, gender, age){
    return db
      .from('listeners')
      .select('listeners.*', 'mpath_users.user_age', 'mpath_users.user_gender', 'mpath_users.user_name')
      .rightJoin('mpath_users', 'mpath_users.id', 'listeners.user_id')
      .where({'listeners.topic': topic, 'mpath_users.user_gender': gender, 'mpath_users.user_age': age})
      .first();
  },
  
  getMatchSpeaker(db, topic, gender, age){
    return db
      .from('speakers')
      .select('speakers.*', 'mpath_users.user_age', 'mpath_users.user_gender', 'mpath_users.user_name')
      .rightJoin('mpath_users', 'mpath_users.id', 'speakers.user_id')
      .where({'speakers.topic': topic, 'mpath_users.user_gender': gender, 'mpath_users.user_age': age})
      .first();
  }
};

module.exports = PairsService;
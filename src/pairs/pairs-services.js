const xss = require('xss');

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
  getMatchListener(db, m_topic, m_gender, m_age){
    return db
      .from('listeners')
      .select('listeners.*', 'mpath_users.user_age', 'mpath_users.user_gender', 'mpath_users.user_name')
      .rightJoin('mpath_users', 'mpath_users.id', 'listeners_user_id')
      .where('topic', m_topic)
      .where('mpath_users.user_gender', m_gender)
      .where('mpath_users.user_age', m_age)
      .first();
  },
  getMatcSpeaker(db, m_topic, m_gender, m_age){
    return db
      .from('speakers')
      .select('speakers.*', 'mpath_users.user_age', 'mpath_users.user_gender', 'mpath_users.user_name')
      .rightJoin('mpath_users', 'mpath_users.id', 'speakers_user_id')
      .where('topic', m_topic)
      .where('mpath_users.user_gender', m_gender)
      .where('mpath_users.user_age', m_age)
      .first();
  }
};

module.exports = PairsService;
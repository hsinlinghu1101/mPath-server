const xss = require('xss');
const bcrypt = require('bcryptjs');

//The pattern makes 4 checks, for a lower case, an upper case, a number and 1 of the specified "special" characters. 
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService ={
  hasUserWithUserName(db, user_name){
    return db('mpath_users')
      .where({user_name})
      .first()
      .then(user => !!user);
  },



  insertUser(db, newUser){
    return db
      .insert(newUser)
      .into('mpath_users')
      .returning('*')
      .then(([user])=> user);
  },
  validatePassword(password){
    if(password.length < 8){
      return 'Password must be longer than 8 characters';
    }
    if(password.length > 72){
      return 'Password must be less than 72 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')){
      return 'Password must not start or end with empty spaces';
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password){
    return bcrypt.hash(password, 12);
  },
  serializeUser(user){
    return{
      id:user.id,
      user_email: xss(user.user_email),
      user_gender:xss(user.user_gender),
      user_name: xss(user.user_name),
      user_age:xss(user.user_age)
    };
  },
};

module.exports= UsersService;
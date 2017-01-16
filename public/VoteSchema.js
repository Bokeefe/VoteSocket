/* jshint esversion: 6 */

module.exports = (mongoose) => {
   var UserSchema = new mongoose.Schema({ // creates a new mongoose schema called UserSchema
      name: String,
      yeaP: Number,
      nayP: Number,
      time: Number,
      total: Number
   });

   var User = mongoose.model('User', UserSchema); // create a new model called 'User' based on 'UserSchema'

   return User;
};

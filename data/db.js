const { Sequelize } = require('sequelize'); // Import Sequelize

var sequelize = new Sequelize('greetings', 'greetings_owner', 'DJ1zGjKE0ZFl',{
  host: 'ep-solitary-smoke-a5l0frf5.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions:{
  ssl: {
    require: true,
    rejectUnauthorized:false}
  },
});

sequelize.authenticate().then(function() {
  console.log("Connection has been established successfully.");
}).catch(function(err){
  console.log("Unable to connect to the database:", err);
});

module.exports = sequelize;
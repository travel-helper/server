"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//config의 정보대로 시퀄라이즈와 mysql을 연결함

db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Post = require('./post')(sequelize,Sequelize);
db.User = require('./user')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);
db.Image = require('./image')(sequelize,Sequelize);

//모델 불러오기, 생성된 sequelize객체를 전달함, 모델에서는 해당 객체에 table 생성

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//모델 관계 설정

module.exports = db;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //테이블의 속성을 지정하는 항
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true, // 고유한 값
        validate: {
          isEmail: true,
        },
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
      phonenumber: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // 필수
      },
      birth: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false, // 필수
      },
      //address 추가 요
    },
    {
      freezeTableName: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      // 모델의 추가 옵션들을 정할 수 있는 항
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };

  return User;
};

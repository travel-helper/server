module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      //테이블의 속성을 지정하는 항
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "",
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "",
      },
      thumbnail: {
        //url형태로 저장
        type: DataTypes.STRING(200),
        defaultValue: "",
      },
      tema: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "",
      },
      price_range: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      region: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      freezeTableName: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      // 모델의 추가 옵션들을 정할 수 있는 항
    }
  );

  Post.associate = (db) => {
    //테이블간 관계 설정

    // belongsTo 1:1
    // hasMany 현재 테이블이 해당 테이블의 행을 여럿 가질 수 있음 1:n
    // belongsToMany 해당 테이블이 현재 테이블의 행을 여럿 가질 수 있음, 해당 테이블에서도 마찬가지임 n:n

    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };

  return Post;
};

module.exports = (sequelize)=>{

    const {DataTypes} = require('sequelize');
  
    const User = sequelize.define('User', {
      //테이블의 속성을 지정하는 항
      email: {
        type: DataTypes.STRING(30), 
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    
    }, {
      freezeTableName: true,
      charset:'utf8mb4',
      collate:'utf8mb4_general_ci'
      // 모델의 추가 옵션들을 정할 수 있는 항
    });
  
    return User;
   
  };
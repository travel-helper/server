# server


# 폴더 구조

📂 git@sisicolcol/server-js
  ┣📂 src
    ┣📂 config # db 옵션
    ┣📂 controllers # req->검사->service && service->검사->res, Controller Layer
    ┣📂 middlewares # 미들웨어들을 짱박아둔 디렉토리
    ┣📂 repositorys # DB와 직접적으로 만나는 디렉토리, DataManager Layer
    ┣📂 routers # 메서드 종류와 요청에 따른 분기를 다루는 곳
    ┣📂 services # Controller에서 비즈니스 로직을 분리한 곳, Service Layer
    ┣📂 utilities # response 관련 status와 함수를 모아둔 곳
    ┣📜 index.js
  ┣📂 swagger
  ┣ .env.example
  ┣ package.json
  
📂git/travle-helper/server
  ┣📂 src
    ┣📂 config
    ┣📂 controllers
    ┣📂 middlewares
    ┣📂 models
    ┣📂 routers
    ┣📂 services
    ┣📂 utilities
    ┣📃 app.js
  ┣📂 swagger
  ┣📂 .env
  ┣📂 package.json
  ┣📂 package-lock.json
  
 # API 파일
 📃 app.js
 📃 routers/router.js
 📃 controllers/controller.js
 📃 services/service
 
 # 실행 방법
 npm run start 
 npm run dev (nodemon : 개발시)

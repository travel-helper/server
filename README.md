# server

### ν΄λ κ΅¬μ‘°

```
πgit/travle-helper/server
  β£π src
    β£π config # νκ²½ μ€μ , db μ΅μ
    β£π controllers # req->κ²μ¬->service && service->κ²μ¬->res, Controller Layer
    β£π middlewares # λ―Έλ€μ¨μ΄
    β£π models # DBμ μ§μ μ μΌλ‘ λ§λλ λλ ν λ¦¬, DataManager Layer
    β£π routers # λ©μλ μ’λ₯μ μμ²­μ λ°λ₯Έ λΆκΈ°λ₯Ό λ€λ£¨λ κ³³
    β£π services # Controllerμμ λΉμ¦λμ€ λ‘μ§μ λΆλ¦¬ν κ³³, Service Layer
    β£π utilities # response κ΄λ ¨ statusμ ν¨μλ₯Ό λͺ¨μλ κ³³
    β£π app.js
  β£π swagger
  β£π .env
  β£π package.json
  β£π package-lock.json
```

### API νμΌ

```
π app.js - μ΅μ€νλ μ€κ° λμ΄ μλ²λ‘ μ μ
π routers/index.js - λλ©μΈλ³ λΌμ°ν°λ‘ λΆκΈ°
π routers/*.router.js - ν΄λΉνλ λλ©μΈλ‘ λΌμ°ν
π controllers/*.controller.js - μ ν¨μ± κ²μ¬, μΈμ¦μ²λ¦¬ λ±, Controller Layer
π services/*.service.js - DBλ‘ λ°μ΄ν° μ λ¬ νΉμ DBμμ λ½μμ¨ λ°μ΄ν° μ μ , Service Layer
π respository/*.repository.js - DB μ κ·Ό μΏΌλ¦¬λ€μ μ§ν©, DataManager Layer
π DataBase
```

### μ€ν λ°©λ²

```
npm run start
npm run dev (nodemon : κ°λ°μ)
```

### default page

```
http://localhost:8080
```

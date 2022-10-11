const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Travle_Helper API",
      version: "1.0.0",
      description: "여행떠나조 Travle_Helper Swagger API",
    },
    server: [
      {
        url: "http://localhost:3000/docs", // url
        description: "Local server", // name
      },
    ],
  },
  apis: ["./routers/*.js", "./controllers/*.js", "./swagger/swaggerDoc.js"],
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };

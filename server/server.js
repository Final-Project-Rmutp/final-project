const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const client = require('./configs/database.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(cors(
// {
//   origin: '*', //remove this part when upload
// }
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// test route
app.get("/", (req, res) => {
    res.json({ message: "API WORK." });
  });

//AuthRoute
const AuthRoute = require('./routes/auth.routes.js');
app.use("/auth", AuthRoute)

//AdminRoute
const AdminRoute = require('./routes/admin.routes.js');
app.use("/admin", AdminRoute)

//UserRoute
const UserRoute = require('./routes/user.routes.js');
app.use("/user", UserRoute)

//LogsRoute
const LogsRoute = require('./routes/logs.routes.js');
app.use("/logs", LogsRoute)

  const options = {
    definition: {
      openapi: '3.0.0', // Specify the OpenAPI version
      info: {
        title: 'Final-Project API Doc',
        version: '1.1.0',
        description: 'API Doc for Room Reservation System',
      },
      components: {
        securitySchemes: {
            Authorization: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                value: "Bearer <JWT token here>"
            }
        }
    },
      servers: [
        {
          url:'http://localhost:5000/',
        },
        {
          url:'http://54.169.85.51:5000/',
        },
    ],
    },
    // Paths to API docs and output format
    apis: ['routes/*.js'],
  };

const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
  console.log(`Server is Running On Port ${port}`)
})


client.connect();
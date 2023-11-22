const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const client = require('./configs/databasepg.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// test route
app.get("/", (req, res) => {
    res.json({ message: "API WORK." });
  });

  const options = {
    definition: {
      openapi: '3.0.0', // Specify the OpenAPI version
      info: {
        title: 'Final-Project API Doc',
        version: '1.0.0',
        description: 'API Doc for Room Reservation System',
      },
      servers: [
        {
          url:'http://localhost:3000',
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
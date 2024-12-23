const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const {version} = require('../package.json')

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Workaholics",
            version
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerformat: "JWT"
              },
            },
          }
    },
    apis: ['./routes/*.js','./utilities/schemas.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port){
    // Sawgger page
    app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec,{explorer:true}))

    //Docs in JSON format
    app.get('docs.json',(req, res) => {
        res.setHeader('Content-type','application/json')
        res.send(swaggerSpec)
    })

    console.log(`Docs available at http://localhost:${port}/docs`)
}

module.exports = swaggerDocs
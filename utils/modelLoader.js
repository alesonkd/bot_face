'use strict'

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const path = require('path')
let Sequelize = require('sequelize')

//Criando a conexão com o banco de dados de acordo com a configuração do config.json
let sequelize = new Sequelize(config.database, config.username, config.password, config);

let db = {}

//Criando um array do caminho dos modelos
const models = [
    '../app/models/input',
    '../app/models/user',
    '../app/models/socialMedia',
]

let l = models.length

//Irá importar os modelos para o sequelize
for (let i = 0; i < l; i++) {
    const model = require(path.join(models[i]))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
}

//Irá percorrer e separar apenas o objeto que contém a propriedade associate, sem o "associate" o sequelize não monta uma relação!
Object.keys(db).forEach((modelName) => {    
    if ('associate' in db[modelName])
        db[modelName].associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
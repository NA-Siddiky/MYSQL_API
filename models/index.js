const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected')
    })
    .catch(err => {
        console.log('Error' + err)
    })

//DB connect and create
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModels.js')(sequelize, DataTypes)

db.sequelize.sync({ force: true })
    .then(() => {
        console.log('yes re-sync done');
    })

// module relations:
// 1. one to many
db.products.hasMany(db.reviews, {
    foreignKey: 'id',
    as: 'review'
})
// +
db.reviews.belongsTo(db.products, {
    foreignKey: 'id',
    as: 'product'
})
// ----------------------------------


module.exports = db
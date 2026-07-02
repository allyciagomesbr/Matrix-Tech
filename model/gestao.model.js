const {DataTypes} = require ('sequelize');
const sequelize = require ('../config/bd');


const Gestao = sequelize.define(
    'Gestao',
    {
    
        nome:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        telefone:{
            type:DataTypes.STRING,
        },
        idade:{
            type:DataTypes.INTEGER
        }
}
    
);

module.exports = Gestao;
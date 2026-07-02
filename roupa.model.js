const {DataTypes} = require ('sequelize');
const sequelize = require ('../config/bd');


const Roupas = sequelize.define(
    'Roupas',
    {
    
        peca:{
            type:DataTypes.STRING,
        },
        tecido:{
            type:DataTypes.STRING,
        },
        valor:{
            type:DataTypes.FLOAT,
        },
        imagem:{
            type:DataTypes.STRING,
        }
}
    
);

module.exports = Roupas;
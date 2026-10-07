const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");

const Carrinho = sequelize.define("Carrinho", {
    roupaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

module.exports = Carrinho;

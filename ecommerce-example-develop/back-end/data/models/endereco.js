module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      logradouro: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return Endereco;
  };
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
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
    
    Endereco.associate = function(models) {
      Endereco.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    };
    
    return Endereco;
  };
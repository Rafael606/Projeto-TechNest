module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stock_quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  });

  // Relacionamento de muitos para muitos com Category
  Product.associate = function(models) {
    Product.belongsToMany(models.Category, {
      through: models.ProductCategory, // Especifica o model da tabela intermediária
      as: 'categories',
      foreignKey: 'productId'
    });
  };

  return Product;
};

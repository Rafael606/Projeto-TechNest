module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  });

  // Definindo associações
  Category.associate = function(models) {
    // Relacionamento de muitos para muitos com Product
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory, // Especifica o model da tabela intermediária
      as: 'products',
      foreignKey: 'categoryId'
    });

    // Relacionamento hierárquico: uma categoria pode ter subcategorias
    Category.hasMany(models.Category, {
      as: 'subcategories', // Alias para subcategorias
      foreignKey: 'parentId' // Chave estrangeira para a categoria pai
    });

    // Uma categoria pode pertencer a uma categoria pai
    Category.belongsTo(models.Category, {
      as: 'parentCategory', // Alias para categoria pai
      foreignKey: 'parentId' // Chave estrangeira para a categoria pai
    });
  };

  return Category;
};

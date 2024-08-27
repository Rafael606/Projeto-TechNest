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

  Category.associate = function(models) {
    Category.hasMany(models.Category, { as: 'subcategories', foreignKey: 'parentId' });
    Category.belongsTo(models.Category, { as: 'parentCategory', foreignKey: 'parentId' });
    Category.belongsToMany(models.Product, { through: 'ProductCategory', as: 'products', foreignKey: 'categoryId' });
  };

  return Category;
};

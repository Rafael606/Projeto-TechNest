const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Endereco = require('./endereco')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.ProductCategory = require('./productcategory')(sequelize, Sequelize);

// Cada usuário pode ter muitos endereços, mas cada endereço pertence a um único usuário.
// Associações com alias
db.User.hasMany(db.Endereco, { as: 'enderecos', foreignKey: 'userId' });
db.Endereco.belongsTo(db.User, { as: 'usuario', foreignKey: 'userId' });

//Muitos produtos podem pertencer a muitas categorias, e muitas categorias podem conter muitos produtos. 
//Por isso tem a tabela de ProductCategory
db.Category.belongsToMany(db.Product, {
  through: db.ProductCategory, 
  as: 'products',         // Alias para a relação, se necessário
  foreignKey: 'categoryId' // Chave estrangeira na tabela ProductCategory
});

db.Product.belongsToMany(db.Category, {
  through: db.ProductCategory,
  as: 'categories',        // Alias para a relação, se necessário
  foreignKey: 'productId'   // Chave estrangeira na tabela ProductCategory
});

// Relacionamento de categorias (categoria pai e subcategorias)
db.Category.hasMany(db.Category, {
  as: 'subcategories',     // Alias para subcategorias
  foreignKey: 'parentId'   // Chave estrangeira referenciando a categoria pai
});

db.Category.belongsTo(db.Category, {
  as: 'parentCategory',    // Alias para categoria pai
  foreignKey: 'parentId'   // Chave estrangeira referenciando a categoria pai
});

module.exports = db;

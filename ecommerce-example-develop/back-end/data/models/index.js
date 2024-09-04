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
db.Order = require('./order')(sequelize, Sequelize);
db.OrderItem = require('./orderitem')(sequelize, Sequelize);
db.ProductCategory = require('./productcategory')(sequelize, Sequelize);

// Cada usuário pode ter muitos pedidos, e cada pedido pertence a um único usuário.
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

// Cada usuário pode ter muitos endereços, mas cada endereço pertence a um único usuário.
db.User.hasMany(db.Endereco);
db.Endereco.belongsTo(db.User);

//Muitos produtos podem estar em muitos pedidos, e muitos pedidos podem conter muitos produtos.
//Por isso tem a tabela OrderItem
db.Order.belongsToMany(db.Product, { through: db.OrderItem });
db.Product.belongsToMany(db.Order, { through: db.OrderItem });

//Muitos produtos podem pertencer a muitas categorias, e muitas categorias podem conter muitos produtos. 
//Por isso tem a tabela de ProductCategory
db.Category.belongsToMany(db.Product, { through: db.ProductCategory });
db.Product.belongsToMany(db.Category, { through: db.ProductCategory });

// Relacionamentos de categorias (categoria pai e subcategorias)
db.Category.hasMany(db.Category, { as: 'subcategories', foreignKey: 'parentId' });
db.Category.belongsTo(db.Category, { as: 'parentCategory', foreignKey: 'parentId' });

module.exports = db;

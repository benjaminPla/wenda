import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
		primaryKey: true,
  },
  type: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  specie: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  variety: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
},
{
	timestamps: false,
});

await sequelize.sync({ force: true }).then(() => console.log('Products sync successfully!'));

await sequelize.query("insert into Products (id, type, specie, variety, origin) values (1, 'visa-electron', 'Ruble', 'RUB', 'Russia');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (2, 'jcb', 'Euro', 'EUR', 'Greece');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (3, 'bankcard', 'Rupiah', 'IDR', 'Indonesia');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (4, 'diners-club-carte', 'Rupiah', 'IDR', 'Indonesia');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (5, 'switch', 'Rupiah', 'IDR', 'Indonesia');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (6, 'maestro', 'Rupiah', 'IDR', 'Indonesia');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (7, 'jcb', 'Real', 'BRL', 'Brazil');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (8, 'diners-club-enroute', 'Real', 'BRL', 'Brazil');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (9, 'jcb', 'Pound', 'SYP', 'Syria');");
await sequelize.query("insert into Products (id, type, specie, variety, origin) values (10, 'jcb', 'Yuan Renminbi', 'CNY', 'China');");


export default Product;